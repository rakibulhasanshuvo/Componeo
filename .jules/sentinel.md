## 2024-05-24 - Cryptographically Secure Identifiers
**Vulnerability:** Use of `Math.random()` to generate unique file names during file upload.
**Learning:** `Math.random()` generates predictable values which can be guessed or lead to file collisions (especially if used without timestamp or if timestamps match). Predictable file names can lead to unauthorized access if filenames are guessed, or overwriting of files.
**Prevention:** Use `crypto.randomUUID()` to generate cryptographically secure, random unguessable IDs for temporary files, file uploads, and session tokens.
