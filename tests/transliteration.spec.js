const { test, expect } = require('@playwright/test');

test.describe('SwiftTranslator Singlish → Sinhala', () => {

  const baseURL = 'https://www.swifttranslator.com/'; 

  async function convertInput(page, inputText, timeout = 10000) {
    await page.goto(baseURL);

    
    await page.fill(
      'textarea[placeholder="Input Your Singlish Text Here."]',
      inputText
    );

    
    const outputLocator = page.locator('div.whitespace-pre-wrap.overflow-y-auto.bg-slate-50');
    await outputLocator.waitFor({ state: 'visible', timeout: timeout });
    
    
    let actual = '';
    try {
      
      await expect(async () => {
        const text = await outputLocator.textContent();
        if (text.trim() === '') {
          throw new Error('Empty output');
        }
        actual = text.trim();
      }).toPass({ timeout: timeout });
    } catch (error) {
      
      const text = await outputLocator.textContent();
      actual = text.trim();
      
      if (actual === '') {
        console.log(`Warning: No output for input: "${inputText}"`);
      }
    }

    return actual;
  }


  const positiveCases = [
    { id: 'Pos_Fun_01', input: 'mama gedhara yanavaa.', expected: 'මම ගෙදර යනවා.' },
    { id: 'Pos_Fun_02', input: 'api kaeema kanna yanavaa saha passe chithrapatayak balamu', expected: 'අපි කෑම කන්න යනවා සහ පස්සේ චිත්‍රපටයක් බලමු.' },
    { id: 'Pos_Fun_03', input: 'oya enavaanam mama balan innavaa', expected: 'ඔයා එනවානම් මම බලන් ඉන්නවා' },
    { id: 'Pos_Fun_04', input: 'oyaa kavadhdha enne?', expected: 'ඔයා කවද්ද එන්නේ?' },
    { id: 'Pos_Fun_05', input: 'issarahata enna.', expected: 'ඉස්සරහට එන්න.' },
    { id: 'Pos_Fun_06', input: ' mama ehema karanne naehae', expected: ' මම එහෙම කරන්නේ නැහැ' },
    { id: 'Pos_Fun_07', input: ' karuNaakaralaa mata podi   udhavvak karanna puLuvandha?', expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_08', input: 'ehema karapan', expected: ' එහෙම කරපන්' }, 
    { id: 'Pos_Fun_09', input: 'mama iyee gedhara giyaa', expected: 'මම ඉයේ ගෙදර ගියා' }, 
    { id: 'Pos_Fun_10', input: 'api heta gedhara yamu', expected: 'අපි හෙට ගෙදර යමු' },
    { id: 'Pos_Fun_11', input: 'hari hari lassanayi', expected: 'හරි හරි ලස්සනයි' },
    { id: 'Pos_Fun_12', input: 'Zoom meeting ekak thiyennee heta', expected: ' Zoom meeting එකක් තියෙන්නේ හෙට' },
    { id: 'Pos_Fun_13', input: 'aayuboovan!', expected: ' ආයුබෝවන්!' },
    { id: 'Pos_Fun_14', input: 'mata nidhimathayi', expected: 'මට නිදිමතයි' },
    { id: 'Pos_Fun_15', input: ' puluvannam mata eeka evanna', expected: 'පුළුවන්නම් මට ඒක එවන්න' },
    { id: 'Pos_Fun_16', input: ' oyaalaa enavadha?.', expected: 'ඔයාලා එනවද?.' },
    { id: 'Pos_Fun_17', input: 'api Kandy valata yamu', expected: 'අපි Kandy වලට යමු' },
    { id: 'Pos_Fun_18', input: 'mata OTP eka evanna', expected: 'මට OTP එක එවන්න' },
    { id: 'Pos_Fun_19', input: 'meeka hariyata vaeda karanavaadha?', expected: 'මේක හරියට වැඩ කරනවාද?' },
    { id: 'Pos_Fun_20', input: ' Rs. 5343 gannavaa', expected: '  Rs. 5343 ගන්නවා' },
    { id: 'Pos_Fun_21', input: ' 7.30 AM ta meeting ekak thiyenavaa', expected: '7.30 AM ට meeting එකක් තියෙනවා' },
    { id: 'Pos_Fun_22', input: 'milk ml 500 ගන්න', expected: 'milk ml 500 ගන්න' },
    { id: 'Pos_Fun_23', input: 'mama gedhara yanavaa oyaa enavadha?', expected: 'මම ගෙදර යනවා ඔයා එනවද?' },
    { id: 'Pos_Fun_24', input: ' ela machan api passe kathaa karamu', expected: 'එල මචන් අපි පස්සේ කතා කරමු' },
  ];

  for (const tc of positiveCases) {
    test(`${tc.id} - ${tc.input}`, async ({ page }) => {
      const actual = await convertInput(page, tc.input);
      expect(actual).toBe(tc.expected);
    });
  }

  const negativeCases = [
    { 
      id: 'Neg_Fun_01', 
      input: 'hetaapiyanavaa',
      shouldFail: true 
    },
    { 
      id: 'Neg_Fun_02', 
      input: ' mama office yanna kalin check karanna oonee the document status and approval flow',
      shouldFail: true
    },
    { 
      id: 'Neg_Fun_03', 
      input: 'hari hari hari hari lassanai', 
      shouldFail: true,
      expectedIfCorrect: 'ඔයා කොහොමද?' 
    },
    { 
      id: 'Neg_Fun_04', 
      input: ' mama iiyee office giyaa saha adha dhaen vaeda karanavaa namuth heta vacation ganna inne', 
      shouldFail: true,
      expectedIfCorrect: 'හරි යන්න' 
    },
    { 
      id: 'Neg_Fun_05', 
      input: 'oyaa enne!!! mama balagena inne??', 
      shouldFail: true,
      expectedIfCorrect: 'URL එක WhatsApp කරන්න' 
    },
    { 
      id: 'Neg_Fun_06', 
      input: 'mama heta enne na', 
      shouldFail: true
    },
    { 
      id: 'Neg_Fun_07', 
      input: 'mama gedhara yanavaa', 
      shouldFail: true,
      expectedIfCorrect: 'Rs. 5000 දෙන්න' 
    },
    { 
      id: 'Neg_Fun_08', 
      input: 'mata items 10 20 30 ganna oonee', 
      shouldFail: true,
      expectedIfCorrect: 'Rs. 1000 දෙන්න' 
    },
    { 
      id: 'Neg_Fun_09', 
      input: 'ado machan ela kiri wadak wenne nae bn', 
      shouldFail: true,
      expectedIfCorrect: 'එල 100% මචන්' 
    },
    { 
      id: 'Neg_Fun_10', 
      input: 'mama අද office yanna inne',
      shouldFail: true,
      expectedIfCorrect: 'අනේ එන්න' 
    },
  ];

  
  for (const tc of negativeCases) {
    test(`${tc.id} - ${tc.input}`, async ({ page }) => {
      
      const actual = await convertInput(page, tc.input, 5000);
      
      
      console.log(`Negative test ${tc.id}: Output = "${actual}"`);
      
      
      expect(actual).toBe(''); 
    });
  }

});