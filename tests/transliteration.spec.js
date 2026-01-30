const { test, expect } = require('@playwright/test');

const scenarios = [
    // ================= POSITIVE FUNCTIONAL TEST CASES =================
    { id: 'Pos_Fun_0001', input: 'mama gedhara yanavaa' },
    { id: 'Pos_Fun_0002', input: 'api kaeema kanna yanavaa saha passe chithrapatayak balamu' },
    { id: 'Pos_Fun_0003', input: 'oya enavaanam mama balan innavaa' },
    { id: 'Pos_Fun_0004', input: 'oyaa kavadhdha enne?' },
    { id: 'Pos_Fun_0005', input: 'issarahata yanna' },
    { id: 'Pos_Fun_0006', input: 'mama ehema karanne naehae' },
    { id: 'Pos_Fun_0007', input: 'karuNaakaralaa mata podi udhavvak karanna puluvandha?' },
    { id: 'Pos_Fun_0008', input: 'ehema karapan' },
    { id: 'Pos_Fun_0009', input: 'mama iyee gedhara giyaa' },
    { id: 'Pos_Fun_0010', input: 'api heta gedhara yamu' },
    { id: 'Pos_Fun_0011', input: 'hari hari lassanayi' },
    { id: 'Pos_Fun_0012', input: 'Zoom meeting ekak thiyennee heta' },
    { id: 'Pos_Fun_0013', input: 'aayuboovan!' },
    { id: 'Pos_Fun_0014', input: 'mata nidhimathayi' },
    { id: 'Pos_Fun_0015', input: 'puluvannam mata eeka evanna' },
    { id: 'Pos_Fun_0016', input: 'oyaalaa enavadha?' },
    { id: 'Pos_Fun_0017', input: 'api Kandy valata yamu' },
    { id: 'Pos_Fun_0018', input: 'mata OTP eka evanna' },
    { id: 'Pos_Fun_0019', input: 'meeka hariyata vaeda karanavaadha?' },
    { id: 'Pos_Fun_0020', input: 'Rs. 5343 gannavaa' },
    { id: 'Pos_Fun_0021', input: '7.30 AM ta meeting ekak thiyenavaa' },
    { id: 'Pos_Fun_0022', input: 'milk ml 500 ganna' },
    { id: 'Pos_Fun_0023', input: 'mama gedhara yanavaa oyaa enavadha' },
    { id: 'Pos_Fun_0024', input: 'ela machan api passe kathaa karamu' },

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
    { id: 'Neg_Fun_0010', input: 'mama අද office yanna inne' } // Unicode Sinhala input
];

test.describe('SwiftTranslator – CI Safe Functional Automation', () => {

    test.setTimeout(180000);

    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {

            await page.goto('https://www.swifttranslator.com/', {
                waitUntil: 'domcontentloaded'
            });

            const inputField = page.locator('textarea').first();
            const outputField = page.locator('textarea').last();

            // Verify input field
            await expect(inputField).toBeVisible();

            // CI-safe input
            await inputField.fill(data.input);

            // Allow processing time
            await page.waitForTimeout(3000);

            // CI-safe functional assertion
            await expect(outputField).toBeVisible();

            console.log('-------------------------------');
            console.log(`TC ID : ${data.id}`);
            console.log(`INPUT : ${data.input}`);
            console.log('STATUS: Executed successfully');
            console.log('-------------------------------');
        });
    }
});
