import fs from 'fs';

import { ITokenScanOutput } from './types';

// Regular expression to match color codes in various formats.
const COLOR_REGEX =
  /(?<=(?:^|[^a-zA-Z\d]))(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|rgba?\([^)]*\))(?=(?:$|[^a-zA-Z\d]))/g;

// Counters for design tokens and inline color codes.
let designTokenCount = 0;
let inlineColorCodeCount = 0;

// Extensions to skip
const skipExtensions = ['.spec.ts', '.stories.ts', '.spec.tsx'];

// Extensions to analyze
const analyzeExtensions = [
  '.ts',
  '.tsx',
  '.less',
  '.scss',
  '.css',
  '.js',
  '.jsx',
];

/**
 * Analyzes the contents of a file to count occurrences of design tokens and inline color codes.
 * @param filePath The path to the file to analyze.
 * @param enumName The name of the design token enumeration.
 */
function analyzeFile(filePath: string, enumName: string): void {
  const sourceCode: string = fs.readFileSync(filePath, 'utf-8');

  // Find occurrences of design tokens.
  const designTokenOccurrences = sourceCode.match(
    new RegExp(`${enumName}\\.\\w+`, 'g')
  );
  if (designTokenOccurrences) {
    designTokenCount += designTokenOccurrences.length;
  }

  // Find occurrences of inline color codes.
  const colorStringLiterals = sourceCode.match(COLOR_REGEX);
  if (colorStringLiterals) {
    inlineColorCodeCount += colorStringLiterals.length;
  }
}

/**
 * Recursively analyzes files in a directory to count occurrences of design tokens and inline color codes.
 * @param dirPath The path to the directory to analyze.
 * @param enumName The name of the design token enumeration.
 */
function analyzeDirectory(dirPath: string, enumName: string): void {
  const files: string[] = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = `${dirPath}/${file}`;

    // Skip files based on extensions.
    if (skipExtensions.some((ext) => file.endsWith(ext))) {
      return;
    }

    if (fs.statSync(filePath).isDirectory()) {
      analyzeDirectory(filePath, enumName);
    } else {
      // Analyze files based on extensions.
      if (analyzeExtensions.some((ext) => file.endsWith(ext))) {
        analyzeFile(filePath, enumName);
      }
    }
  });
}

/**
 * Scans a directory for usages of design tokens and inline color codes, reporting the counts of each.
 * @param path The path to the directory to scan.
 * @param enumNameToSearchFor The name of the design token enumeration to search for.
 * @returns An object containing the counts of design token usages and inline color code occurrences.
 */
export function scanForTokenUsages(
  path: string,
  enumNameToSearchFor?: string
): ITokenScanOutput {
  const enumName = enumNameToSearchFor ?? 'DesignToken';

  analyzeDirectory(path, enumName);

  return { designTokenCount, inlineColorCodeCount };
}
