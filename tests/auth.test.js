// Simple validation script - run with: node tests/auth.test.js
import fs from 'fs';
import path from 'path';

console.log('🧪 Starting Authentication Tests...\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition) {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
    }
}

async function runTests() {
    const rootDir = process.cwd();

    // Test 1: Check Firebase config exists
    try {
        const configExists = fs.existsSync(path.join(rootDir, 'services/firebase.ts'));
        test('Firebase config file exists (services/firebase.ts)', configExists);
    } catch (e) {
        test('Firebase config file exists', false);
    }

    // Test 2: Check AuthContext exists
    try {
        const authContextExists = fs.existsSync(path.join(rootDir, 'context/AuthContext.tsx'));
        test('AuthContext file exists', authContextExists);
    } catch (e) {
        test('AuthContext file exists', false);
    }

    // Test 3: Check SignIn page exists
    try {
        const signInExists = fs.existsSync(path.join(rootDir, 'pages/SignIn.tsx'));
        test('SignIn page exists', signInExists);
    } catch (e) {
        test('SignIn page exists', false);
    }

    // Test 4: Check SignUp page exists
    try {
        const signUpExists = fs.existsSync(path.join(rootDir, 'pages/SignUp.tsx'));
        test('SignUp page exists', signUpExists);
    } catch (e) {
        test('SignUp page exists', false);
    }

    // Test 5: Check ProtectedRoute exists
    try {
        const protectedRouteExists = fs.existsSync(path.join(rootDir, 'components/ProtectedRoute.tsx'));
        test('ProtectedRoute component exists', protectedRouteExists);
    } catch (e) {
        test('ProtectedRoute component exists', false);
    }

    // Test 6: Check environment variables
    try {
        const envExists = fs.existsSync(path.join(rootDir, '.env.local'));
        test('Environment file exists', envExists);

        if (envExists) {
            const envContent = fs.readFileSync(path.join(rootDir, '.env.local'), 'utf8');
            const hasKey = envContent.includes('VITE_FIREBASE_API_KEY');
            test('Environment file contains Firebase keys', hasKey);
        }
    } catch (e) {
        test('Environment file exists', false);
    }

    // Print results
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    tests.results.forEach(r => console.log(r));
    console.log('================');
    console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

    if (tests.failed > 0) {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed! Authentication setup is complete.');
    }
}

runTests().catch(console.error);
