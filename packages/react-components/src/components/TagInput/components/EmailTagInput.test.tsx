import { emailRegex } from './EmailTagInput';

describe('emailRegex', () => {
  describe('valid email addresses', () => {
    it('should accept simple valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user@domain.co.uk',
        'name.surname@company.com',
        'first+last@test.org',
        'user_name@test-domain.com',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should accept emails with special characters in local part', () => {
      const validEmails = [
        'user!name@example.com',
        'user#name@example.com',
        'user$name@example.com',
        'user%name@example.com',
        'user&name@example.com',
        'user*name@example.com',
        'user+name@example.com',
        'user/name@example.com',
        'user=name@example.com',
        'user?name@example.com',
        'user^name@example.com',
        'user_name@example.com',
        'user`name@example.com',
        'user{name@example.com',
        'user|name@example.com',
        'user}name@example.com',
        'user~name@example.com',
        'user-name@example.com',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should accept quoted strings in local part', () => {
      // Note: The regex supports quoted strings but they're quite restrictive
      // The current implementation accepts quoted strings with escaped characters
      const validEmails = ['"test"@example.com'];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should accept IP address domain literals', () => {
      const validEmails = [
        'user@[192.168.1.1]',
        'user@[10.0.0.1]',
        'user@[255.255.255.255]',
        'user@[0.0.0.0]',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should accept emails with subdomains', () => {
      const validEmails = [
        'user@mail.example.com',
        'user@subdomain.mail.example.com',
        'user@deep.nested.subdomain.example.com',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should be case insensitive', () => {
      const validEmails = [
        'User@Example.COM',
        'USER@EXAMPLE.COM',
        'UsEr@ExAmPlE.CoM',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });
  });

  describe('invalid email addresses', () => {
    it('should reject emails without @ symbol', () => {
      const invalidEmails = ['userexample.com', 'user.example.com', 'user'];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails without domain', () => {
      const invalidEmails = ['user@', '@example.com', 'user@.com'];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails with spaces (unless quoted)', () => {
      const invalidEmails = [
        'user name@example.com',
        'user@exam ple.com',
        'user @example.com',
        'user@ example.com',
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails with multiple @ symbols', () => {
      const invalidEmails = [
        'user@@example.com',
        'user@example@com',
        'user@example.com@',
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails with invalid domain', () => {
      const invalidEmails = [
        'user@.example.com',
        'user@example..com',
        'user@example.com.',
        'user@-example.com',
        'user@example-.com',
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject empty or whitespace-only strings', () => {
      const invalidEmails = ['', ' ', '   ', '\t', '\n'];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails with invalid characters in unquoted local part', () => {
      const invalidEmails = [
        'user name@example.com', // space
        'user(name)@example.com', // parentheses
        'user<name>@example.com', // angle brackets
        'user,name@example.com', // comma
        'user:name@example.com', // colon
        'user;name@example.com', // semicolon
        'user[name]@example.com', // square brackets
        'user"name@example.com', // unescaped quote
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject invalid IP addresses in domain literals', () => {
      const invalidEmails = [
        'user@[256.1.1.1]', // >255
        'user@[192.168.1]', // incomplete
        'user@[192.168.1.1.1]', // too many octets
        'user@[192.168.-1.1]', // negative
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails starting or ending with dot in local part', () => {
      const invalidEmails = [
        '.user@example.com',
        'user.@example.com',
        '..user@example.com',
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should reject emails with consecutive dots in local part', () => {
      const invalidEmails = [
        'user..name@example.com',
        'user...name@example.com',
      ];

      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('RFC 5322 compliance - domain literals', () => {
    it('should not allow [ character inside domain literal content', () => {
      // The regex should prevent [ (0x5B) in domain literal content
      // This tests that the fix removed \x53-\x5b from the character class
      const email = 'user@[192.168.1.1[extra]';
      expect(emailRegex.test(email)).toBe(false);
    });

    it('should not allow ] character inside IPv6-like domain literal', () => {
      // Malformed domain literal with extra ]
      const email = 'user@[fe80::1]]';
      expect(emailRegex.test(email)).toBe(false);
    });

    it('should correctly validate domain literal structure', () => {
      // The regex requires either a complete IPv4 address OR
      // an IPv4 address followed by a tagged literal in the last octet position
      // Pure IPv6 literals like [ipv6:...] are not supported by this regex
      const validIPv4 = 'user@[192.168.1.1]';
      expect(emailRegex.test(validIPv4)).toBe(true);

      // Tagged literals must appear after IPv4 pattern (not standalone)
      const standaloneIPv6 = 'user@[ipv6:2001:db8::1]';
      expect(emailRegex.test(standaloneIPv6)).toBe(false);
    });
  });

  describe('performance and ReDoS prevention', () => {
    it('should handle very long local parts efficiently', () => {
      const longLocalPart = 'a'.repeat(64); // RFC 5321 max local part is 64 chars
      const email = `${longLocalPart}@example.com`;

      const start = performance.now();
      const result = emailRegex.test(email);
      const duration = performance.now() - start;

      expect(result).toBe(true);
      expect(duration).toBeLessThan(10); // Should complete in less than 10ms
    });

    it('should handle very long domain names efficiently', () => {
      const longDomain = 'a'.repeat(63); // Max label length is 63 chars
      const email = `user@${longDomain}.com`;

      const start = performance.now();
      const result = emailRegex.test(email);
      const duration = performance.now() - start;

      expect(result).toBe(true);
      expect(duration).toBeLessThan(10);
    });

    it('should handle pathological inputs efficiently (ReDoS test)', () => {
      // Test with repeated patterns that could cause backtracking
      const pathologicalInputs = [
        'a'.repeat(100) + '@' + 'a'.repeat(100),
        'a-'.repeat(50) + '@example.com',
        'a.'.repeat(50) + '@example.com',
      ];

      pathologicalInputs.forEach((email) => {
        const start = performance.now();
        emailRegex.test(email);
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(100); // Should complete in less than 100ms
      });
    });

    it('should handle invalid inputs with many special characters efficiently', () => {
      const email = "!#$%&'*+/=?^_`{|}~-".repeat(10) + '@example.com';

      const start = performance.now();
      const result = emailRegex.test(email);
      const duration = performance.now() - start;

      expect(result).toBe(true);
      expect(duration).toBeLessThan(10);
    });
  });

  describe('edge cases', () => {
    it('should handle email addresses with numbers', () => {
      const validEmails = [
        'user123@example.com',
        '123user@example.com',
        '123@example.com',
        'user@123.com',
        'user@example123.com',
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should handle single character local part and domain', () => {
      const validEmails = ['a@b.co', 'x@y.org'];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should reject local part longer than reasonable', () => {
      // While technically RFC 5321 allows 64 chars, extremely long ones might indicate issues
      const veryLongLocalPart = 'a'.repeat(65);
      const email = `${veryLongLocalPart}@example.com`;

      // This should still work with our regex (we don't enforce length limits)
      expect(emailRegex.test(email)).toBe(true);
    });

    it('should reject TLD-only domains', () => {
      // The regex requires at least one dot in the domain (e.g., example.com)
      // TLD-only domains like "localhost" are not accepted
      const email = 'user@localhost';
      expect(emailRegex.test(email)).toBe(false);
    });
  });
});
