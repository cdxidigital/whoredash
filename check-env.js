
console.log('=== Environment Variables Check ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? '✓ Set' : '✗ Missing');
console.log('REPL_ID:', process.env.REPL_ID ? '✓ Set' : '✗ Missing');
console.log('REPLIT_DOMAINS:', process.env.REPLIT_DOMAINS ? '✓ Set' : '✗ Missing');
console.log('ISSUER_URL:', process.env.ISSUER_URL || 'Using default: https://replit.com/oidc');
console.log('=====================================');
