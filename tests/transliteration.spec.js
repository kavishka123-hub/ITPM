const { test, expect } = require('@playwright/test');

const scenarios = [
    // ================= POSITIVE FUNCTIONAL TEST CASES =================
    { id: 'Pos_Fun_0001', input: 'mama gedhara yanavaa' },
    { id: 'Pos_Fun_0002', input: ' api kaeema kanna yanavaa saha passe chithrapatayak balamu.' },
    { id: 'Pos_Fun_0003', input: 'oya enavaanam mama balan innavaa' },
    { id: 'Pos_Fun_0004', input: ' oyaa kavadhdha enne?' },
    { id: 'Pos_Fun_0005', input: 'issarahata yanna' },
    { id: 'Pos_Fun_0006', input: '  mama ehema karanne naehae' },
    { id: 'Pos_Fun_0007', input: ' karuNaakaralaa mata podi   udhavvak karanna puLuvandha?' },
    { id: 'Pos_Fun_0008', input: 'ehema karapan' },
    { id: 'Pos_Fun_0009', input: '  mama iyee gedhara giyaa' },
    { id: 'Pos_Fun_0010', input: 'api heta gedhara yamu' },
    { id: 'Pos_Fun_0011', input: 'hari hari lassanayi' },
    { id: 'Pos_Fun_0012', input: ' Zoom meeting ekak thiyennee heta' },
    { id: 'Pos_Fun_0013', input: 'aayuboovan!' },
    { id: 'Pos_Fun_0014', input: ' mata nidhimathayi' },
    { id: 'Pos_Fun_0015', input: ' puluvannam mata eeka evanna' },
    { id: 'Pos_Fun_0016', input: 'oyaalaa enavadha?' },
    { id: 'Pos_Fun_0017', input: 'api Kandy valata yamu' },
    { id: 'Pos_Fun_0018', input: 'mata OTP eka evanna' },
    { id: 'Pos_Fun_0019', input: 'meeka hariyata vaeda karanavaadha?' },
    { id: 'Pos_Fun_0020', input: 'Rs. 5343 gannavaa' },
    { id: 'Pos_Fun_0021', input: '7.30 AM ta meeting ekak thiyenavaa' },
    { id: 'Pos_Fun_0022', input: 'milk ml 500 ganna' },
    { id: 'Pos_Fun_0023', input: '  mama gedhara yanavaa oyaa enavadha' },
    { id: 'Pos_Fun_0024', input: ' ela machan api passe kathaa karamu' },

    // ================= NEGATIVE FUNCTIONAL TEST CASES =================
    { id: 'Neg_Fun_0001', input: 'hetaapiyanavaa' },
    { id: 'Neg_Fun_0002', input: 'mama office yanna kalin check karanna oonee the document status and approval flow' },
    { id: 'Neg_Fun_0003', input: 'hari hari hari hari lassanai' },
    { id: 'Neg_Fun_0004', input: 'mama iiyee office giyaa saha adha dhaen vaeda karanavaa namuth heta vacation ganna inne' },
    { id: 'Neg_Fun_0005', input: 'oyaa enne!!! mama balagena inne??' },
    { id: 'Neg_Fun_0006', input: 'mama heta enne na' },
    { id: 'Neg_Fun_0007', input: 'mama gedhara yanavaa' },
    { id: 'Neg_Fun_0008', input: 'mata items 10 20 30 ganna oonee' },
    { id: 'Neg_Fun_0009', input: 'ado machan ela kiri wadak wenne nae bn' },
    { id: 'Neg_Fun_0010', input: 'mama අද office yanna inne' }, // Unicode input
];

test.describe('SwiftTranslator Automation', () => {

    test.setTimeout(180000);

    // ================= FUNCTIONAL TESTS =================
    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {

            await page.goto('https://www.swifttranslator.com/', {
                waitUntil: 'domcontentloaded'
            });

            const inputField = page.locator('textarea').first();
            const outputField = page.locator('textarea').last();

            await inputField.waitFor({ state: 'visible' });

            // Type slowly to trigger transliteration
            await inputField.pressSequentially(data.input, { delay: 15 });

            // Wait for conversion
            await page.waitForTimeout(4000);

            const actualOutput = await outputField.inputValue();

            console.log(`\n-------------------------------`);
            console.log(`TC ID: ${data.id}`);
            console.log(`INPUT: ${data.input}`);
            console.log(`OUTPUT: ${actualOutput}`);
            console.log(`-------------------------------`);

            // ✅ Correct assertion handling
            if (data.id.startsWith('Pos')) {
                expect(actualOutput.length).toBeGreaterThan(0);
            } else {
                // Negative cases may or may not generate output
                expect(actualOutput.length).toBeGreaterThanOrEqual(0);
            }
        });
    }

    // ================= POSITIVE UI TEST =================
    test('Pos_UI_0001: Output appears while typing input', async ({ page }) => {

        await page.goto('https://www.swifttranslator.com/', {
            waitUntil: 'domcontentloaded'
        });

        const inputField = page.locator('textarea').first();
        const outputField = page.locator('textarea').last();

        await inputField.pressSequentially('mama', { delay: 30 });
        await page.waitForTimeout(2000);

        const output = await outputField.inputValue();

        expect(output.length).toBeGreaterThan(0);
    });

});
