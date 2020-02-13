### Badge

## Usage

Use badges to draw attention errors and new, updated or important content, like unread messages. Hide badhe when the count is 0.

```js
<p>
  <Badge>7</Badge> Tickets
</p>
<p>
  <Badge>!</Badge> Settings
</p>
<p>
  <Badge>99+</Badge> Chats
</p>
```

## Badge placement

Place badges directly adjoining the related UI object. Badges can appear to the right or left of an UI object

```js
<Badge>!</Badge>
```

## Over 99

If a badge needs to display a number above 99, use “99+”

## Style

Badges are small enough to fit next to an UI object. They have a bold, and filled style that makes them stand out, and a fully rounded border radius.

## Color

- Red reserved to display a sense of urgency or indicate state.
- Light Variation is best for non-essential element on the screen and should recede from the primary content.

# Primary

Errors and important content, like unread messages, new tickets.

```js
<Badge>1</Badge>
<Badge>11</Badge>
<Badge>99+</Badge>
```

Non-essential content like new features or updates.

```js
<Badge secondary>1</Badge>
<Badge secondary>11</Badge>
<Badge secondary>99+</Badge>
```
