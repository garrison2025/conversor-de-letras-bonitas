
import { FontStyle, FontCategory, ReadabilityLevel } from '../types';

// ==========================================
// 1. HELPER FUNCTIONS
// ==========================================

export const createMapper = (map: Record<string, string>) => (text: string): string => {
  return [...text].map(char => map[char] || char).join('');
};

export const interleave = (text: string, separator: string): string => {
  return [...text].join(separator);
};

export const reverse = (text: string): string => {
  return [...text].reverse().join('');
};

// ==========================================
// 2. CHARACTER MAPS
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

function makeMap(source: string, target: string): Record<string, string> {
  const map: Record<string, string> = {};
  const src = [...source];
  const tgt = [...target];
  src.forEach((char, i) => {
    if (tgt[i]) map[char] = tgt[i];
  });
  return map;
}

const scriptNormal = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const scriptBold = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const frakturNormal = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const frakturBold = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const doubleStruck = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕛𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
const sansBold = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
const serifBold = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
const sansItalic = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡';
const serifItalic = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍';
const serifBoldItalic = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
const monospace = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
const smallCaps = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ';
const wide = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９';
const circlesWhite = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ①②③④⑤⑥⑦⑧⑨⑩';
const circlesBlack = '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾';
const squaresBlack = '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'; 
const parenthesized = '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵';
const upsideDownSource = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const upsideDownTarget = 'zʎxʍʌnʇsɹbduoɯlʞɾıɥƃɟǝpɔqɐZ⅄XϺΛ∩┴SᴚÒԀONW˥ʞſIH⅁ℲƎpƆq∀68ㄥ9ϛㄣƐᄅƖ0';
const regional = '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿';

export const scriptMap = makeMap(lower + upper, scriptNormal);
export const boldScriptMap = makeMap(lower + upper, scriptBold);
export const frakturMap = makeMap(lower + upper, frakturNormal);
export const boldFrakturMap = makeMap(lower + upper, frakturBold);
export const doubleStruckMap = makeMap(lower + upper + numbers, doubleStruck);
export const sansBoldMap = makeMap(lower + upper + numbers, sansBold);
export const serifBoldMap = makeMap(lower + upper + numbers, serifBold);
export const sansItalicMap = makeMap(lower + upper, sansItalic);
export const serifItalicMap = makeMap(lower + upper, serifItalic);
export const serifBoldItalicMap = makeMap(lower + upper, serifBoldItalic);
export const monospaceMap = makeMap(lower + upper + numbers, monospace);
export const smallCapsMap = makeMap(lower, smallCaps);
export const wideMap = makeMap(lower + upper + numbers, wide);
export const bubblesMap = makeMap(lower + upper + numbers, circlesWhite);
export const blackBubblesMap = makeMap(lower + upper + numbers, circlesBlack);
export const blackSquareMap = makeMap(upper, squaresBlack);
export const parenthesizedMap = makeMap(lower, parenthesized);
export const upsideDownMap = makeMap(upsideDownSource, upsideDownTarget);
export const superscriptMap = makeMap('0123456789abcdefghijklmnopqrstuvwxyz', '⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ');
export const subscriptMap = makeMap('0123456789', '₀₁₂₃₄₅₆₇₈₉');
export const regionalMap = makeMap(lower + upper, regional + regional);

// Pseudo Alphabets
const pseudoCyrillicMap = makeMap('ABCEHKMOPTXaceopxy', 'АВСЕНКМОРТХасеорху');
const greekMap = makeMap('ABEZHIKMNOTYX', 'ΑΒΕΖΗΙΚΜΝΟΤΥΧ'); 
const cherokeeMap = makeMap('RDZA4WbPlhTk', 'ᎡᎠᏃᎪᏎᎳᏏᏢ𝓵ᏂᎢk'); // Partial
const runicMap = makeMap('abcdefghijklmnopqrstuvwxyz', 'ᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᛩᚱᛋᛏᚢᚡᚹᛪᛦᛉ');

// ==========================================
// 3. CONVERTERS
// ==========================================

export const toScript = createMapper(scriptMap);
export const toBoldScript = createMapper(boldScriptMap);
export const toFraktur = createMapper(frakturMap);
export const toBoldFraktur = createMapper(boldFrakturMap);
export const toDoubleStruck = createMapper(doubleStruckMap);
export const toSansBold = createMapper(sansBoldMap);
export const toSerifBold = createMapper(serifBoldMap);
export const toSansItalic = createMapper(sansItalicMap);
export const toSerifItalic = createMapper(serifItalicMap);
export const toSerifBoldItalic = createMapper(serifBoldItalicMap);
export const toMonospace = createMapper(monospaceMap);
export const toSmallCaps = (text: string) => createMapper(smallCapsMap)(text.toLowerCase());
export const toWide = createMapper(wideMap);
export const toBubbles = createMapper(bubblesMap);
export const toBlackBubbles = createMapper(blackBubblesMap);
export const toBlackSquare = (text: string) => createMapper(blackSquareMap)(text.toUpperCase());
export const toSquare = (text: string) => [...text].map(c => `[${c}]`).join('');
export const toParenthesized = (text: string) => createMapper(parenthesizedMap)(text.toLowerCase());

export const toUpsideDown = (text: string) => {
    return reverse(createMapper(upsideDownMap)(text));
};

export const toUnderline = (text: string) => {
    return [...text].join('\u0332') + '\u0332';
};

export const toStrikethrough = (text: string) => {
    return [...text].join('\u0336') + '\u0336';
};

export const toSlash = (text: string) => {
    return [...text].join('\u0338') + '\u0338';
};

export const toDotted = (text: string) => {
    return [...text].join('\u0323') + '\u0323';
};

export const toLightning = (text: string) => {
    return [...text].join('⚡');
};

export const toInvisible = (text: string) => {
    return [...text].map(() => '\u3164').join('');
};

export const toZalgo = (text: string) => {
    const zalgoUp = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    const zalgoDown = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
    return [...text].map(c => {
        let res = c;
        if(c.trim().length > 0) {
           res += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
           res += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
        }
        return res;
    }).join('');
};

export const toHorrorZalgo = (text: string) => {
    const zalgoChars = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a', '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
    return [...text].map(c => {
        let res = c;
        if(c.trim().length > 0) {
            for(let i=0; i<3; i++) res += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
        }
        return res;
    }).join('');
};

export const toPseudoCyrillic = (text: string) => createMapper(pseudoCyrillicMap)(text);
export const toGreek = (text: string) => createMapper(greekMap)(text.toUpperCase());
export const toPseudoAsian = (text: string) => [...text].map(c => c + ' ').join('');
export const toRunic = (text: string) => createMapper(runicMap)(text.toLowerCase());
export const toCherokee = (text: string) => createMapper(cherokeeMap)(text);
export const toBraille = (text: string) => text; 
export const toMorse = (text: string) => text; 
export const toBinary = (text: string) => [...text].map(c => c.charCodeAt(0).toString(2)).join(' ');
export const toCurrency = (text: string) => text; 
export const toStacked = (text: string) => text; 
export const toRegional = (text: string) => createMapper(regionalMap)(text);
export const toRomanNumerals = (text: string) => {
    let num = parseInt(text);
    if(isNaN(num) || num < 1 || num > 3999) return text;
    const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for ( const i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
};

// ==========================================
// 4. GENERATORS (LOGIC)
// ==========================================

export const AESTHETIC_PHRASES = [
    "Good Vibes Only",
    "✨ Dreams Come True ✨",
    "☾ Moon Child ☽",
    "Stay Wild",
    "Be Your Own Muse",
    "Angel Energy 👼",
    "Manifesting...",
    "Self Love Club",
    "Golden Hour",
    "Main Character Energy",
    "To the Moon 🚀",
    "Bad Decisions 😈",
    "No Rain, No Flowers",
    "Trust the Process",
    "Carpe Diem",
    "Memento Mori",
    "Amor Fati",
    "Made in Heaven",
    "Limited Edition",
    "Cyberpunk 2077"
];

const CURSIVE_SYMBOLS = [
    { s: '✨', n: 'Sparkles' }, { s: '♥', n: 'Heart' }, { s: '★', n: 'Star' }, 
    { s: '❀', n: 'Flower' }, { s: '♫', n: 'Music' }, { s: '🦋', n: 'Butterfly' },
    { s: '☾', n: 'Moon' }, { s: '🔥', n: 'Fire' }, { s: '👑', n: 'Crown' },
    { s: '🎀', n: 'Bow' }, { s: '🍒', n: 'Cherry' }, { s: '🧸', n: 'Bear' },
    { s: '⚡', n: 'Zap' }, { s: '💎', n: 'Gem' }, { s: '☁', n: 'Cloud' },
    { s: '✈', n: 'Plane' }, { s: '☠', n: 'Skull' }, { s: '⚓', n: 'Anchor' },
    { s: '⚔️', n: 'Sword' }, { s: '✿', n: 'Sakura' }, { s: '❄', n: 'Snow' },
    { s: '✦', n: 'Spark' }, { s: '❥', n: 'Love' }, { s: '❦', n: 'Floral' },
    { s: '❧', n: 'Leaf' }, { s: '♛', n: 'Queen' }, { s: '☮', n: 'Peace' },
    { s: '☯', n: 'YinYang' }, { s: '☀', n: 'Sun' }, { s: '☂', n: 'Umbrella' }
];

const TATTOO_SYMBOLS = [
    { s: '🌹', n: 'Rose' }, { s: '⚜️', n: 'Fleur' }, { s: '✝', n: 'Cross' },
    { s: '⚓', n: 'Anchor' }, { s: '⚔️', n: 'Sword' }, { s: '🏹', n: 'Arrow' },
    { s: '🕸', n: 'Web' }, { s: '🕷', n: 'Spider' }, { s: '🐍', n: 'Snake' },
    { s: '💀', n: 'Skull' }, { s: '👁', n: 'Eye' }, { s: '🌙', n: 'Crescent' },
    { s: '🐺', n: 'Wolf' }, { s: '🗡', n: 'Dagger' }, { s: '🩸', n: 'Blood' },
    { s: '🕯', n: 'Candle' }, { s: '🗝', n: 'Key' }, { s: '🧭', n: 'Compass' },
    { s: '⚖', n: 'Scale' }, { s: '♾', n: 'Infinity' }
];

const BRACKETS = [
    { l: '【', r: '】', n: 'Asian' }, { l: '『', r: '』', n: 'Corner' },
    { l: '«', r: '»', n: 'Guillemet' }, { l: '「', r: '」', n: 'Quote' },
    { l: '₍', r: '₎', n: 'Tiny' }, { l: '☾', r: '☽', n: 'Moon' },
    { l: '꧁', r: '꧂', n: 'Wing' }, { l: '༺', r: '༻', n: 'Decor' }
];

// ==========================================
// 5. SYMBOL COLLECTIONS (For Hub)
// ==========================================

export interface SymbolCategory {
    id: string;
    label: string;
    items: string[];
}

export const SYMBOL_COLLECTIONS: SymbolCategory[] = [
    {
        id: 'popular',
        label: 'Populares',
        items: ['★', '✨', '♥', '⚡', '♛', '☠', '✈', '♫', '☁', '✿', '☾', '➤', '⚓', '⚔', '∞', '', '✓', '✘']
    },
    {
        id: 'stars',
        label: 'Estrellas',
        items: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '⁂', '⁎', '⁑', '✢', '✣', '✤', '✥', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋']
    },
    {
        id: 'hearts',
        label: 'Corazones',
        items: ['♥', '♡', '❤', '❥', '❣', '❦', '❧', 'დ', 'ღ', '۵', 'ও', 'ლ', '💕', '💗', '💖', '💘', '💝', '💟', '💔']
    },
    {
        id: 'arrows',
        label: 'Flechas',
        items: ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹', '↺', '↻', '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊', '⇋', '⇌', '⇍', '⇎', '⇏', '⇐', '⇑', '⇒', '⇓', '⇔', '⇕', '⇖', '⇗', '⇘', '⇙', '⇚', '⇛', '⇜', '⇝', '⇞', '⇟', '⇠', '⇡', '⇢', '⇣', '⇤', '⇥', '⇦', '⇧', '⇨', '⇩', '⇪', '⇫', '⇬', '⇭', '⇮', '⇯', '⇰', '⇱', '⇲', '⇳', '⇴', '⇵', '⇶', '⇷', '⇸', '⇹', '⇺', '⇻', '⇼', '⇽', '⇾', '⇿']
    },
    {
        id: 'math',
        label: 'Matemáticas',
        items: ['∀', '∁', '∂', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∊', '∋', '∌', '∍', '∎', '∏', '∐', '∑', '−', '∓', '∔', '∕', '∖', '∗', '∘', '∙', '√', '∛', '∜', '∝', '∞', '∟', '∠', '∡', '∢', '∣', '∤', '∥', '∦', '∧', '∨', '∩', '∪', '∫', '∬', '∭', '∮', '∯', '∰', '∱', '∲', '∳', '∴', '∵', '∶', '∷', '∸', '∹', '∺', '∻', '∼', '∽', '∾', '∿', '≀', '≁', '≂', '≃', '≄', '≅', '≆', '≇', '≈', '≉', '≊', '≋', '≌', '≍', '≎', '≏', '≐', '≑', '≒', '≓', '≔', '≕', '≖', '≗', '≘', '≙', '≚', '≛', '≜', '≝', '≞', '≟', '≠', '≡', '≢', '≣', '≤', '≥', '≦', '≧', '≨', '≩', '≪', '≫', '≬', '≭', '≮', '≯', '≰', '≱', '≲', '≳', '≴', '≵', '≶', '≷', '≸', '≹', '≺', '≻', '≼', '≽', '≾', '≿', '⊀', '⊁', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉', '⊊', '⊋', '⊌', '⊍', '⊎', '⊏', '⊐', '⊑', '⊒', '⊓', '⊔', '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '⊢', '⊣', '⊤', '⊥', '⊦', '⊧', '⊨', '⊩', '⊪', '⊫', '⊬', '⊭', '⊮', '⊯', '⊰', '⊱', '⊲', '⊳', '⊴', '⊵', '⊶', '⊷', '⊸', '⊹', '⊺', '⊻', '⊼', '⊽', '⊾', '⊿', '⋀', '⋁', '⋂', '⋃', '⋄', '⋅', '⋆', '⋇', '⋈', '⋉', '⋊', '⋋', '⋌', '⋍', '⋎', '⋏', '⋐', '⋑', '⋒', '⋓', '⋔', '⋕', '⋖', '⋗', '⋘', '⋙', '⋚', '⋛', '⋜', '⋝', '⋞', '⋟', '⋠', '⋡', '⋢', '⋣', '⋤', '⋥', '⋦', '⋧', '⋨', '⋩', '⋪', '⋫', '⋬', '⋭', '⋮', '⋯', '⋰', '⋱', '⋲', '⋳', '⋴', '⋵', '⋶', '⋷', '⋸', '⋹', '⋺', '⋻', '⋼', '⋽', '⋾', '⋿']
    },
    {
        id: 'brackets',
        label: 'Paréntesis',
        items: ['〈', '〉', '《', '》', '「', '」', '『', '』', '【', '】', '〔', '〕', '〖', '〗', '〘', '〙', '〚', '〛', '（', '）', '｛', '｝', '﹙', '﹚', '﹛', '﹜', '﹝', '﹞', '«', '»', '‹', '›', '〈', '〉', '₍', '₎', '⁽', '⁾', '❨', '❩', '❪', '❫', '❬', '❭', '❮', '❯', '❰', '❱', '❲', '❳', '❴', '❵']
    },
    {
        id: 'check',
        label: 'Checks',
        items: ['✓', '✔', '✕', '✖', '✗', '✘', '☐', '☑', '☒', '❍', '✇']
    },
     {
        id: 'music',
        label: 'Música',
        items: ['♩', '♪', '♫', '♬', '♭', '♮', '♯', '𝄞', '𝄡', '𝄢', '𝄪', '𝄫', '𝄬', '𝄭', '𝄮', '𝄯', '𝄰', '𝄱', '𝄲', '𝄳', '𝄴', '𝄵', '𝄶', '𝄷', '𝄸', '𝄹', '𝄺', '𝄻', '𝄼', '𝄽', '𝄾', '𝄿', '𝅀', '𝅁', '𝅂', '𝅃', '𝅄', '𝅅', '𝅆', '𝅇', '𝅈', '𝅉', '𝅊', '𝅋', '𝅌', '𝅍', '𝅎', '𝅏', '𝅐', '𝅑', '𝅒', '𝅓', '𝅔', '𝅕', '𝅖', '𝅗', '𝅘', '𝅙', '𝅚', '𝅛', '𝅜', '𝅝', '𝅗𝅥', '𝅘𝅥', '𝅘𝅥𝅮', '𝅘𝅥𝅯', '𝅘𝅥𝅰', '𝅘𝅥𝅱', '𝅘𝅥𝅲', '𝅥', '𝅦', '𝅧', '𝅨', '𝅩', '𝅪', '𝅫', '𝅬', '𝅭', '𝅮', '𝅯', '𝅰', '𝅱', '𝅲', '𝅳']
    }
];

// ==========================================
// 6. FONT CATEGORY DEFINITIONS
// ==========================================

const CURSIVE_ESSENTIALS: FontStyle[] = [
    { id: 'script-normal', name: 'Cursiva (Normal)', category: [FontCategory.ALL, FontCategory.CURSIVE, FontCategory.FACEBOOK], converter: toScript, readability: 'high' },
    { id: 'script-bold', name: 'Cursiva (Negrita)', category: [FontCategory.ALL, FontCategory.CURSIVE, FontCategory.FACEBOOK, FontCategory.TATTOO], converter: toBoldScript, readability: 'high' },
    { id: 'cursive-fraktur', name: 'Gótica (Fraktur)', category: [FontCategory.CURSIVE, FontCategory.GOTHIC], converter: toFraktur, readability: 'medium' },
    { id: 'cursive-serif-italic', name: 'Itálica (Serif)', category: [FontCategory.CURSIVE, FontCategory.FACEBOOK], converter: toSerifItalic, readability: 'high' },
    { id: 'cursive-sans-italic', name: 'Itálica (Sans)', category: [FontCategory.CURSIVE, FontCategory.FACEBOOK], converter: toSansItalic, readability: 'high' },
    { id: 'cursive-double', name: 'Doble Línea (Outline)', category: [FontCategory.CURSIVE, FontCategory.FACEBOOK, FontCategory.TATTOO], converter: toDoubleStruck, readability: 'medium' },
];

const CORE_FONTS: FontStyle[] = [
    { id: 'hand-dotted', name: 'Manuscrita Punteada', category: [FontCategory.CURSIVE, FontCategory.TATTOO], converter: (t) => toDotted(toScript(t)), readability: 'medium' },
    { id: 'hand-under', name: 'Cursiva Subrayada', category: [FontCategory.CURSIVE], converter: (t) => toUnderline(toScript(t)), readability: 'high' },
    { id: 'hand-strike', name: 'Cursiva Tachada', category: [FontCategory.CURSIVE], converter: (t) => toStrikethrough(toScript(t)), readability: 'medium' },
    { id: 'hand-wide', name: 'Cursiva Espaciada', category: [FontCategory.CURSIVE], converter: (t) => interleave(toScript(t), ' '), readability: 'high' },
];

const FACEBOOK_ESSENTIALS: FontStyle[] = [
    // 1. Core Essentials (Negrita, Cursiva)
    { id: 'fb-bold-sans', name: 'Negrita (Sans)', category: [FontCategory.FACEBOOK], converter: toSansBold, readability: 'high' },
    { id: 'fb-bold-serif', name: 'Negrita (Serif)', category: [FontCategory.FACEBOOK], converter: toSerifBold, readability: 'high' },
    { id: 'fb-italic-sans', name: 'Cursiva (Sans)', category: [FontCategory.FACEBOOK], converter: toSansItalic, readability: 'high' },
    { id: 'fb-italic-serif', name: 'Cursiva (Serif)', category: [FontCategory.FACEBOOK], converter: toSerifItalic, readability: 'high' },
    { id: 'fb-bold-italic', name: 'Negrita Cursiva', category: [FontCategory.FACEBOOK], converter: toSerifBoldItalic, readability: 'high' },
    
    // 2. Aesthetic & Elegant
    { id: 'fb-script', name: 'Manuscrita (Script)', category: [FontCategory.FACEBOOK, FontCategory.CURSIVE], converter: toScript, readability: 'high' },
    { id: 'fb-script-bold', name: 'Manuscrita Negrita', category: [FontCategory.FACEBOOK, FontCategory.CURSIVE], converter: toBoldScript, readability: 'high' },
    { id: 'fb-gothic', name: 'Gótica (Fraktur)', category: [FontCategory.FACEBOOK, FontCategory.GOTHIC], converter: toFraktur, readability: 'medium' },
    { id: 'fb-gothic-bold', name: 'Gótica Negrita', category: [FontCategory.FACEBOOK, FontCategory.GOTHIC], converter: toBoldFraktur, readability: 'medium' },
    
    // 3. Visual Impact
    { id: 'fb-double', name: 'Doble Trazo (Outline)', category: [FontCategory.FACEBOOK, FontCategory.CURSIVE], converter: toDoubleStruck, readability: 'medium' },
    { id: 'fb-circle-b', name: 'Círculos Negros', category: [FontCategory.FACEBOOK], converter: toBlackBubbles, readability: 'high' },
    { id: 'fb-circle-w', name: 'Círculos Blancos', category: [FontCategory.FACEBOOK], converter: toBubbles, readability: 'high' },
    { id: 'fb-square-b', name: 'Cuadrados Negros', category: [FontCategory.FACEBOOK], converter: toBlackSquare, readability: 'high' },
    { id: 'fb-square-w', name: 'Cuadrados Blancos', category: [FontCategory.FACEBOOK], converter: toSquare, readability: 'medium' },
    { id: 'fb-parenthesis', name: 'Paréntesis', category: [FontCategory.FACEBOOK], converter: toParenthesized, readability: 'medium' },
    { id: 'fb-diamonds-int', name: 'Diamantes (Decorado)', category: [FontCategory.FACEBOOK], converter: (t) => interleave(t, ' ⟡ '), readability: 'high' },
    
    // 4. Fun & Special
    { id: 'fb-smallcaps', name: 'Mayúsculas Pequeñas', category: [FontCategory.FACEBOOK, FontCategory.CURSIVE], converter: toSmallCaps, readability: 'high' },
    { id: 'fb-wide', name: 'Espaciado (Vaporwave)', category: [FontCategory.FACEBOOK, FontCategory.AMINO], converter: toWide, readability: 'high' },
    { id: 'fb-upside', name: 'Invertido (Al Revés)', category: [FontCategory.FACEBOOK], converter: toUpsideDown, readability: 'low' },
    { id: 'fb-mono', name: 'Máquina de Escribir', category: [FontCategory.FACEBOOK], converter: toMonospace, readability: 'high' },
];

const FACEBOOK_SPECIFIC_REQUESTS: FontStyle[] = [
    // 1. Visual Effects
    { id: 'fb-req-strike', name: 'Tachado (Texto)', category: [FontCategory.FACEBOOK], converter: toStrikethrough, readability: 'medium' },
    { id: 'fb-req-maldito', name: 'Texto Maldito (Zalgo)', category: [FontCategory.FACEBOOK, FontCategory.GOTHIC], converter: toHorrorZalgo, readability: 'low' },
    { id: 'fb-req-under', name: 'Subrayado', category: [FontCategory.FACEBOOK], converter: toUnderline, readability: 'high' },
    
    // 2. Pseudo-alphabets
    { id: 'fb-req-ruso', name: 'Estilo Ruso / Soviético', category: [FontCategory.FACEBOOK], converter: toPseudoCyrillic, readability: 'medium' },
    { id: 'fb-req-griego', name: 'Estilo Griego', category: [FontCategory.FACEBOOK], converter: (t) => `▀▄▀▄ ${toGreek(t)} ▄▀▄▀`, readability: 'medium' },
    { id: 'fb-req-asian', name: 'Estilo Asiático', category: [FontCategory.FACEBOOK], converter: toPseudoAsian, readability: 'low' },
    
    // 3. Micro & Position
    { id: 'fb-req-super', name: 'Superíndice', category: [FontCategory.FACEBOOK], converter: (t) => createMapper(superscriptMap)(t), readability: 'medium' },
    { id: 'fb-req-sub', name: 'Subíndice', category: [FontCategory.FACEBOOK], converter: (t) => createMapper(subscriptMap)(t), readability: 'medium' },
    
    // 4. Symbol Based
    { id: 'fb-req-money', name: 'Moneda / Dinero', category: [FontCategory.FACEBOOK], converter: toCurrency, readability: 'medium' },
    { id: 'fb-req-paren', name: 'Paréntesis', category: [FontCategory.FACEBOOK], converter: toParenthesized, readability: 'medium' },
    
    // 5. Special Utility
    { id: 'fb-req-invis', name: 'Espacio Invisible', category: [FontCategory.FACEBOOK], converter: toInvisible, readability: 'low' }
];

const GOTHIC_COLLECTION: FontStyle[] = [
    // 1. Core Essentials (Must Have)
    { id: 'got-core-bold', name: 'Gótica Negrita (Original)', category: [FontCategory.GOTHIC, FontCategory.TATTOO], converter: toBoldFraktur, readability: 'medium' },
    { id: 'got-core-normal', name: 'Gótica Normal (Fraktur)', category: [FontCategory.GOTHIC, FontCategory.TATTOO], converter: toFraktur, readability: 'medium' },
    
    // 2. High Relevance
    { id: 'got-script', name: 'Cursiva Gótica (Bold)', category: [FontCategory.GOTHIC], converter: toBoldScript, readability: 'high' },
    { id: 'got-outline', name: 'Gótica Hueca (Doble)', category: [FontCategory.GOTHIC], converter: toDoubleStruck, readability: 'medium' },
    
    // 3. Decorated Styles (Gamer / Free Fire)
    { id: 'got-dec-wings', name: 'Gótica Alada ꧁꧂', category: [FontCategory.GOTHIC], converter: (t) => `꧁ ${toBoldFraktur(t)} ꧂`, readability: 'medium' },
    { id: 'got-dec-dark', name: 'Gótica Dark ☠', category: [FontCategory.GOTHIC], converter: (t) => `☠ ${toBoldFraktur(t)} ☠`, readability: 'medium' },
    { id: 'got-dec-warrior', name: 'Gótica Guerrera ⚔️', category: [FontCategory.GOTHIC], converter: (t) => `⚔️ ${toBoldFraktur(t)} ⚔️`, readability: 'medium' },
    { id: 'got-dec-demon', name: 'Gótica Demoníaca ψ', category: [FontCategory.GOTHIC], converter: (t) => `ψ ${toFraktur(t)} ψ`, readability: 'medium' },
    { id: 'got-dec-magic', name: 'Gótica Mágica ✴', category: [FontCategory.GOTHIC], converter: (t) => `✴ ${toBoldFraktur(t)} ✴`, readability: 'medium' },
    { id: 'got-dec-vamp', name: 'Gótica Vampiro 🦇', category: [FontCategory.GOTHIC], converter: (t) => `🦇 ${toBoldFraktur(t)} 🦇`, readability: 'medium' },
    { id: 'got-dec-rock', name: 'Gótica Rock 🤘', category: [FontCategory.GOTHIC], converter: (t) => `🤘 ${toBoldFraktur(t)} 🤘`, readability: 'medium' },

    // 4. Mashups
    { id: 'got-chains', name: 'Gótica Encadenada', category: [FontCategory.GOTHIC], converter: (t) => `⛓ ${toBoldFraktur(t)} ⛓`, readability: 'medium' },
    { id: 'got-spaced', name: 'Gótica Espaciada', category: [FontCategory.GOTHIC], converter: (t) => interleave(toBoldFraktur(t), ' '), readability: 'medium' },
];

const FACEBOOK_CREATIVE: FontStyle[] = [
    { id: 'fb-flags', name: 'Letras Azules (Regional)', category: [FontCategory.FACEBOOK], converter: toRegional, readability: 'high' },
    { id: 'fb-mirror', name: 'Espejo', category: [FontCategory.FACEBOOK], converter: (t) => reverse(t), readability: 'low' },
    { id: 'fb-slash', name: 'Barrado', category: [FontCategory.FACEBOOK], converter: toSlash, readability: 'medium' },
    { id: 'fb-lightning', name: 'Eléctrico', category: [FontCategory.FACEBOOK], converter: toLightning, readability: 'medium' },
    { id: 'fb-braille', name: 'Braille', category: [FontCategory.FACEBOOK], converter: toBraille, readability: 'low' },
    { id: 'fb-morse', name: 'Morse', category: [FontCategory.FACEBOOK], converter: toMorse, readability: 'low' },
    { id: 'fb-binary', name: 'Binario', category: [FontCategory.FACEBOOK], converter: toBinary, readability: 'low' },
    { id: 'fb-cloud', name: 'Nube Aesthetic', category: [FontCategory.FACEBOOK], converter: (t) => `☁ ${t} ☁`, readability: 'high' },
    { id: 'fb-stars', name: 'Estrellas Aesthetic', category: [FontCategory.FACEBOOK], converter: (t) => `★ ${t} ★`, readability: 'high' },
];

const TATTOO_ESSENTIALS: FontStyle[] = [
    // 1. Gótica / Chicano (The Core)
    { id: 'tat-gothic-oe', name: 'Gótica (Old English)', category: [FontCategory.TATTOO, FontCategory.GOTHIC], converter: toBoldFraktur, readability: 'medium' },
    { id: 'tat-chicano', name: 'Chicano (Gangsta)', category: [FontCategory.TATTOO], converter: (t) => `⚜️ ${toBoldFraktur(t)} ⚜️`, readability: 'medium' },
    { id: 'tat-medieval', name: 'Medieval (Clásica)', category: [FontCategory.TATTOO, FontCategory.GOTHIC], converter: toFraktur, readability: 'medium' },

    // 2. Cursiva / Caligrafía (Female Preference)
    { id: 'tat-script-bold', name: 'Caligrafía (Script)', category: [FontCategory.TATTOO, FontCategory.CURSIVE], converter: toBoldScript, readability: 'high' },
    { id: 'tat-script-fine', name: 'Manuscrita (Fina)', category: [FontCategory.TATTOO, FontCategory.CURSIVE], converter: toScript, readability: 'high' },
    { id: 'tat-cursive-elegant', name: 'Cursiva Elegante', category: [FontCategory.TATTOO], converter: (t) => `~ ${toBoldScript(t)} ~`, readability: 'high' },

    // 3. Máquina de Escribir (Micro Tattoos)
    { id: 'tat-typewriter', name: 'Máquina de Escribir', category: [FontCategory.TATTOO], converter: toMonospace, readability: 'high' },
    { id: 'tat-minimal', name: 'Minimalista (Espaciada)', category: [FontCategory.TATTOO], converter: (t) => interleave(toMonospace(t), ' '), readability: 'high' },

    // 4. Old School (Tradicional)
    { id: 'tat-oldschool', name: 'Old School (Outline)', category: [FontCategory.TATTOO], converter: toDoubleStruck, readability: 'medium' },
    { id: 'tat-sailor', name: 'Marinero (Anchor)', category: [FontCategory.TATTOO], converter: (t) => `⚓ ${toDoubleStruck(t)} ⚓`, readability: 'medium' },
    { id: 'tat-love', name: 'Amor (Corazón)', category: [FontCategory.TATTOO], converter: (t) => `♥ ${toDoubleStruck(t)} ♥`, readability: 'medium' },

    // 5. Romana / Serif (Quotes)
    { id: 'tat-serif-bold', name: 'Romana (Serif)', category: [FontCategory.TATTOO], converter: toSerifBold, readability: 'high' },
    { id: 'tat-inscription', name: 'Inscripción (Piedra)', category: [FontCategory.TATTOO], converter: toSmallCaps, readability: 'high' },
    
    // 6. Dates & Symbols
    { id: 'tat-roman-num', name: 'Números Romanos (Fechas)', category: [FontCategory.TATTOO], converter: (t) => {
        const res = toRomanNumerals(t);
        // If conversion happened (it's numbers), return it. If not (it's text), fallback to Serif Bold.
        return res !== t ? res : toSerifBold(t);
    }, readability: 'high' },
    { id: 'tat-runic', name: 'Runas Vikingas', category: [FontCategory.TATTOO], converter: toRunic, readability: 'low' },
];

// --- TATTOO EXPANSION (Styles 6-10) ---

// 6. Graffiti / Urbano
const TATTOO_GRAFFITI: FontStyle[] = [
    { id: 'tat-graf-bubble', name: 'Graffiti Burbuja', category: [FontCategory.TATTOO, FontCategory.GRAFFITI], converter: toBlackBubbles, readability: 'high' },
    { id: 'tat-graf-block', name: 'Graffiti Bloques', category: [FontCategory.TATTOO, FontCategory.GRAFFITI], converter: toBlackSquare, readability: 'high' },
    { id: 'tat-graf-tag', name: 'Tag Callejero', category: [FontCategory.TATTOO, FontCategory.GRAFFITI], converter: (t) => `★ ${toSansBold(t)} ★`, readability: 'high' },
    { id: 'tat-graf-drip', name: 'Efecto Goteo', category: [FontCategory.TATTOO, FontCategory.GRAFFITI], converter: toHorrorZalgo, readability: 'low' },
];

// 7. Geometric / Cyberpunk
const TATTOO_SCIFI: FontStyle[] = [
    { id: 'tat-sci-orbit', name: 'Futurista (Orbitron)', category: [FontCategory.TATTOO], converter: toSmallCaps, readability: 'high' },
    { id: 'tat-sci-mono', name: 'Cyberpunk (Código)', category: [FontCategory.TATTOO], converter: toMonospace, readability: 'high' },
    { id: 'tat-sci-glitch', name: 'Glitch (Falla)', category: [FontCategory.TATTOO], converter: toZalgo, readability: 'low' },
    { id: 'tat-sci-vapor', name: 'Vaporwave (VCR)', category: [FontCategory.TATTOO], converter: toWide, readability: 'high' },
];

// 8. Viking / Runas
const TATTOO_VIKING: FontStyle[] = [
    { id: 'tat-vik-runes', name: 'Runas Nórdicas', category: [FontCategory.TATTOO], converter: toRunic, readability: 'low' },
    { id: 'tat-vik-axe', name: 'Vikingo (Hacha)', category: [FontCategory.TATTOO], converter: (t) => `⚔️ ${toFraktur(t)} ⚔️`, readability: 'medium' },
    { id: 'tat-vik-stone', name: 'Tallado en Piedra', category: [FontCategory.TATTOO], converter: toSmallCaps, readability: 'high' },
];

// 9. Hand-poked / Ignorant
const TATTOO_HANDPOKED: FontStyle[] = [
    { id: 'tat-hp-messy', name: 'Ignorant Style', category: [FontCategory.TATTOO], converter: (t) => t.toLowerCase(), readability: 'high' },
    { id: 'tat-hp-child', name: 'Infantil (Garabato)', category: [FontCategory.TATTOO], converter: toMonospace, readability: 'high' },
    { id: 'tat-hp-scrawl', name: 'Manuscrita Rápida', category: [FontCategory.TATTOO], converter: toScript, readability: 'high' },
];

// 10. Faux Foreign
const TATTOO_FAUX: FontStyle[] = [
    { id: 'tat-faux-jap', name: 'Estilo Japonés', category: [FontCategory.TATTOO], converter: toPseudoAsian, readability: 'low' },
    { id: 'tat-faux-greek', name: 'Estilo Griego', category: [FontCategory.TATTOO], converter: toGreek, readability: 'medium' },
    { id: 'tat-faux-rus', name: 'Estilo Ruso', category: [FontCategory.TATTOO], converter: toPseudoCyrillic, readability: 'medium' },
];

// --- Added Aesthetic & Kawaii Fonts ---
const AESTHETIC_CURSIVE_ADDITIONS: FontStyle[] = [
    { id: 'aes-typewriter', name: 'Máquina de Escribir', category: [FontCategory.CURSIVE], converter: toMonospace, readability: 'high' },
    { id: 'aes-smallcaps', name: 'Mayúsculas Pequeñas', category: [FontCategory.CURSIVE], converter: toSmallCaps, readability: 'high' },
    { id: 'aes-vapor', name: 'Vaporwave (Ancho)', category: [FontCategory.CURSIVE], converter: toWide, readability: 'high' },
    { id: 'aes-circle-w', name: 'Burbujas (Blancas)', category: [FontCategory.CURSIVE], converter: toBubbles, readability: 'high' },
    { id: 'aes-circle-b', name: 'Burbujas (Negras)', category: [FontCategory.CURSIVE], converter: toBlackBubbles, readability: 'high' },
    { id: 'aes-square-w', name: 'Cuadrados (Blancos)', category: [FontCategory.CURSIVE], converter: toSquare, readability: 'medium' },
    { id: 'aes-square-b', name: 'Cuadrados (Negros)', category: [FontCategory.CURSIVE], converter: toBlackSquare, readability: 'high' },
    { id: 'aes-strike', name: 'Tachado (Texto)', category: [FontCategory.CURSIVE], converter: toStrikethrough, readability: 'medium' },
    { id: 'aes-flip', name: 'Al Revés', category: [FontCategory.CURSIVE], converter: toUpsideDown, readability: 'low' },
    // Kawaii
    { id: 'kaw-hearts-i', name: 'Corazones (Intercalado)', category: [FontCategory.CURSIVE, FontCategory.AMINO], converter: (t) => interleave(t, '♥'), readability: 'medium' },
    { id: 'kaw-wings', name: 'Alas de Ángel', category: [FontCategory.CURSIVE, FontCategory.AMINO], converter: (t) => `꧁༒ ${t} ༒꧂`, readability: 'medium' },
    { id: 'kaw-coquette', name: 'Coquette Bow', category: [FontCategory.CURSIVE, FontCategory.AMINO], converter: (t) => `⋆ ˚｡⋆୨୧ ${t} ୨୧⋆ ˚｡⋆`, readability: 'medium' },
    { id: 'kaw-stars-wrap', name: 'Estrellas (Decorado)', category: [FontCategory.CURSIVE], converter: (t) => `★ ${t} ★`, readability: 'high' },
];

// --- Generated Arrays ---

const GENERATED_CURSIVE_FONTS: FontStyle[] = [];
CURSIVE_SYMBOLS.forEach((sym, i) => {
    GENERATED_CURSIVE_FONTS.push({
        id: `cur-dec-${i}`,
        name: `Cursiva ${sym.n} ${sym.s}`,
        category: [FontCategory.CURSIVE, FontCategory.AMINO],
        converter: (t) => `${sym.s} ${toScript(t)} ${sym.s}`,
        readability: 'high'
    });
    if (i % 3 === 0) {
        GENERATED_CURSIVE_FONTS.push({
            id: `cur-int-${i}`,
            name: `Cursiva Cadena ${sym.s}`,
            category: [FontCategory.CURSIVE],
            converter: (t) => interleave(toBoldScript(t), sym.s),
            readability: 'medium'
        });
    }
});

const GENERATED_TATTOO_FONTS: FontStyle[] = [];
TATTOO_SYMBOLS.forEach((sym, i) => {
    GENERATED_TATTOO_FONTS.push({
        id: `tat-dec-f-${i}`,
        name: `Gótica ${sym.n} ${sym.s}`,
        category: [FontCategory.TATTOO, FontCategory.GOTHIC],
        converter: (t) => `${sym.s} ${toFraktur(t)} ${sym.s}`,
        readability: 'medium'
    });
});

const GENERATED_BRACKET_FONTS: FontStyle[] = [];
BRACKETS.forEach((br, i) => {
    GENERATED_BRACKET_FONTS.push({
        id: `br-script-${i}`,
        name: `Cursiva ${br.n} ${br.l}${br.r}`,
        category: [FontCategory.CURSIVE, FontCategory.AMINO],
        converter: (t) => `${br.l} ${toScript(t)} ${br.r}`,
        readability: 'high'
    });
    GENERATED_BRACKET_FONTS.push({
        id: `br-mono-${i}`,
        name: `Aesthetic ${br.n}`,
        category: [FontCategory.FACEBOOK, FontCategory.AMINO],
        converter: (t) => `${br.l} ${toMonospace(t)} ${br.r}`,
        readability: 'high'
    });
});

const EXOTIC_GAMER_FONTS: FontStyle[] = [
    { id: 'game-sniper', name: 'Sniper Mode ︻デ═一', category: [FontCategory.GRAFFITI], converter: (t) => `︻デ═一 ${t}`, readability: 'high' },
    { id: 'game-sword', name: 'Warrior ⚔️', category: [FontCategory.GRAFFITI], converter: (t) => `⚔️ ${toBoldFraktur(t)} ⚔️`, readability: 'medium' },
    { id: 'game-invis', name: 'Texto Invisible', category: [FontCategory.FACEBOOK], converter: toInvisible, readability: 'low' },
    { id: 'exotic-jap', name: 'Estilo Japonés', category: [FontCategory.FACEBOOK, FontCategory.GRAFFITI], converter: toPseudoAsian, readability: 'low' },
    { id: 'exotic-rus', name: 'Estilo Ruso', category: [FontCategory.FACEBOOK], converter: toPseudoCyrillic, readability: 'medium' },
    { id: 'exotic-cher', name: 'Cherokee', category: [FontCategory.FACEBOOK], converter: toCherokee, readability: 'medium' },
    { id: 'glitch-zalgo', name: 'Glitch Zalgo', category: [FontCategory.GOTHIC, FontCategory.GRAFFITI], converter: toZalgo, readability: 'low' },
    { id: 'glitch-horror', name: 'Horror Melt', category: [FontCategory.GOTHIC, FontCategory.TATTOO], converter: toHorrorZalgo, readability: 'low' },
    { id: 'stack-text', name: 'Apilado (Stacked)', category: [FontCategory.FACEBOOK], converter: toStacked, readability: 'low' },
    { id: 'sub-text', name: 'Subíndice', category: [FontCategory.FACEBOOK], converter: (t) => createMapper(subscriptMap)(t), readability: 'medium' },
    { id: 'super-text', name: 'Superíndice', category: [FontCategory.FACEBOOK], converter: (t) => createMapper(superscriptMap)(t), readability: 'medium' }
];

export const fonts: FontStyle[] = [
    ...CURSIVE_ESSENTIALS,
    ...FACEBOOK_ESSENTIALS,
    ...FACEBOOK_SPECIFIC_REQUESTS,
    ...GOTHIC_COLLECTION, 
    ...TATTOO_ESSENTIALS, 
    ...TATTOO_GRAFFITI,
    ...TATTOO_SCIFI,
    ...TATTOO_VIKING,
    ...TATTOO_HANDPOKED,
    ...TATTOO_FAUX,
    ...CORE_FONTS,
    ...AESTHETIC_CURSIVE_ADDITIONS,
    ...FACEBOOK_CREATIVE,
    ...GENERATED_CURSIVE_FONTS,
    ...GENERATED_TATTOO_FONTS,
    ...GENERATED_BRACKET_FONTS,
    ...EXOTIC_GAMER_FONTS
];

export const getFontsByCategory = (category: FontCategory): FontStyle[] => {
  if (category === FontCategory.ALL) return fonts;
  return fonts.filter(font => font.category.includes(category));
};
