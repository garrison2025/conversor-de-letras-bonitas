
import { FontStyle, FontCategory, ReadabilityLevel } from '../types';

// ==========================================
// 1. HELPER FUNCTIONS & MAPPERS
// ==========================================

// Spanish & Diacritic Handling
// We decompose chars (e.g., 'ñ' -> 'n' + '~') so we can map the 'n' to the fancy font 
// and re-attach the combining mark.
const handleDiacritics = (char: string, map: Record<string, string>): string => {
    // Manual overrides for common Spanish chars to ensure stability
    if (char === 'ñ') return (map['n'] || 'n') + '\u0303';
    if (char === 'Ñ') return (map['N'] || 'N') + '\u0303';
    if (char === 'á') return (map['a'] || 'a') + '\u0301';
    if (char === 'é') return (map['e'] || 'e') + '\u0301';
    if (char === 'í') return (map['i'] || 'i') + '\u0301';
    if (char === 'ó') return (map['o'] || 'o') + '\u0301';
    if (char === 'ú') return (map['u'] || 'u') + '\u0301';
    if (char === 'ü') return (map['u'] || 'u') + '\u0308';
    
    // Fallback for other accented chars
    const normalized = char.normalize('NFD');
    if (normalized.length > 1) {
        const base = normalized[0];
        const mark = normalized.slice(1);
        return (map[base] || base) + mark;
    }
    
    return map[char] || map[char.toLowerCase()] || char;
};

const createMapper = (map: Record<string, string>) => (text: string) => {
  return text.split('').map(char => handleDiacritics(char, map)).join('');
};

const surround = (text: string, prefix: string, suffix: string) => `${prefix}${text}${suffix}`;
const interleave = (text: string, symbol: string) => text.split('').join(symbol);
const reverse = (text: string) => text.split('').reverse().join('');

// --- Generators ---
const toZalgo = (text: string) => {
    const down = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e'];
    const mid = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322'];
    const up = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310'];
    return text.split('').map(char => {
        if (char === ' ') return char;
        let res = char;
        if (Math.random() > 0.5) res += up[Math.floor(Math.random() * up.length)];
        if (Math.random() > 0.5) res += mid[Math.floor(Math.random() * mid.length)];
        return res;
    }).join('');
};

const toHorrorZalgo = (text: string) => {
     const down = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u0347', '\u0348', '\u0349', '\u034D', '\u034E', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035A', '\u0323'];
    return text.split('').map(char => {
        if (char === ' ') return char;
        let res = char;
        for(let i=0; i<3; i++) res += down[Math.floor(Math.random() * down.length)]; 
        return res;
    }).join('');
};

const toInvisible = () => '\u3164';

const toRegional = (text: string) => {
    const base = 0x1F1E6; 
    const a = 'a'.charCodeAt(0);
    const z = 'z'.charCodeAt(0);
    return text.split('').map(char => {
        const lower = char.toLowerCase();
        const code = lower.charCodeAt(0);
        if (code >= a && code <= z) return String.fromCodePoint(base + (code - a)) + ' '; 
        return char;
    }).join('');
};

const toBinary = (text: string) => text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

// Roman Numerals
const romanize = (num: number): string => {
  if (isNaN(num) || num <= 0 || num >= 4000) return num.toString();
  const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let roman = '';
  for (let i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
const toRomanNumerals = (text: string) => {
    return text.replace(/\d+/g, (match) => {
        const num = parseInt(match, 10);
        return !isNaN(num) ? romanize(num) : match;
    });
}

// ==========================================
// 2. CHARACTER MAPS (DATA)
// ==========================================

const scriptMap: Record<string, string> = { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' };
const boldScriptMap: Record<string, string> = { a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: 'j', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃', A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜', N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩' };
const frakturMap: Record<string, string> = { a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ' };
const boldFrakturMap: Record<string, string> = { a: '𝖆', b: '𝖇', c: '𝖈', d: '𝖉', e: '𝖊', f: '𝖋', g: '𝖌', h: '𝖍', i: '𝖎', j: '𝖏', k: '𝖐', l: '𝖑', m: '𝖒', n: '𝖓', o: '𝖔', p: '𝖕', q: '𝖖', r: '𝖗', s: '𝖘', t: '𝖙', u: '𝖚', v: '𝖛', w: '𝖜', x: '𝖝', y: '𝖞', z: '𝖟', A: '𝕬', B: '𝕭', C: '𝕮', D: '𝕯', E: '𝕰', F: '𝕱', G: '𝕲', H: '𝕳', I: '𝕴', J: '𝕵', K: '𝕶', L: '𝕷', M: '𝕸', N: '𝕹', O: '𝕺', P: '𝕻', Q: '𝕼', R: '𝕽', S: '𝕾', T: '𝕿', U: '𝖀', V: '𝖁', W: '𝖂', X: '𝖃', Y: '𝖄', Z: '𝖅' };
const doubleStruckMap: Record<string, string> = { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫', A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ', '0': '𝟘', '1': '𝟙', '2': '𝟟', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟟', '7': '𝟟', '8': '𝟠', '9': '𝟡' };
const sansSerifBoldMap: Record<string, string> = { a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇', A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ' };
const sansSerifItalicMap: Record<string, string> = { a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻', A: 'Α', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘐', J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘗', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘝', X: '𝘟', Y: '𝘠', Z: '𝘡' };
const serifBoldMap: Record<string, string> = { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐇', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙' };
const serifItalicMap: Record<string, string> = { a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔', h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟', s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑢', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧', A: '𝐴', B: '𝐵', C: '𝐶', D: '𝐷', E: '𝐸', F: '𝐹', G: '𝐺', H: '𝐻', I: '𝐼', J: '𝐽', K: '𝐾', L: '𝐿', M: '𝑀', N: 'Ｎ', O: '𝑂', P: '𝑃', Q: '𝑄', R: '𝑅', S: '𝑆', T: '𝑇', U: '𝑈', V: '𝑉', W: '𝑊', X: '𝑋', Y: '𝑌', Z: '𝑍' };
const serifBoldItalicMap: Record<string, string> = { a: '𝒂', b: '𝒃', c: '𝒄', d: '𝒅', e: '𝒆', f: '𝒇', g: '𝒈', h: '𝒉', i: '𝒊', j: '𝒋', k: '𝒌', l: '𝒍', m: '𝒎', n: '𝒏', o: '𝒐', p: '𝒑', q: '𝒒', r: '𝒓', s: '𝒔', t: '𝒕', u: '𝒖', v: '𝒗', w: '𝒘', x: '𝒙', y: '𝒚', z: '𝒛', A: '𝑨', B: '𝑩', C: '𝑪', D: '𝑫', E: '𝑬', F: '𝑭', G: '𝑮', H: '𝑯', I: '𝑰', J: '𝑱', K: '𝑲', L: '𝑳', M: '𝑴', N: '𝑵', O: '𝑶', P: '𝑷', Q: '𝑸', R: '𝑹', S: '𝑺', T: '𝑻', U: '𝑼', V: '𝑽', W: '𝑾', X: '𝑿', Y: '𝒀', Z: '𝒁' };
const smallCapsMap: Record<string, string> = { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ', A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ' };
const bubblesMap: Record<string, string> = { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨', '0': '⓪' };
const bubblesBlackMap: Record<string, string> = { a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅶', h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅼', n: '🅝', o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤', v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩', A: '🅐', B: '🅑', C: '🅒', D: '🅓', E: '🅔', F: '🅕', G: '🅶', H: '🅗', I: '🅘', J: '🅙', K: '🅚', L: '🅛', M: '🅼', N: '🅝', O: '🅞', P: '🅟', Q: '🅠', R: '🅡', S: '🅢', T: '🅣', U: '🅤', V: '🅥', W: '🅦', X: '🅧', Y: '🅨', Z: '🅩' };
const squareMap: Record<string, string> = { a: '🄰', b: '🅱', c: '🅲', d: '🅳', e: '🄴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🄻', m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆂', s: '🆃', t: '🆄', u: '🆅', v: '🆆', x: '🆇', y: '🆉', z: '🆎', A: '🄰', B: '🅱', C: '🅲', D: '🅳', E: '🄴', F: '🅵', G: '🅶', H: '🅷', I: '🅸', J: '🅹', K: '🅺', L: '🄻', M: '🅼', N: '🅽', O: '🅾', P: '🅿', Q: '🆀', R: '🆂', S: '🆃', T: '🆄', U: '🆅', V: '🆆', X: '🆇', Y: '🆉', Z: '🆎' };
const blackSquareMap: Record<string, string> = { a: '🅰', b: '🅱', c: '🅲', d: '🅳', e: '🅴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻', m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆁', s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇', y: '🆈', z: '🆉', A: '🅰', B: '🅱', C: '🅲', D: '🅳', E: '🅴', F: '🅵', G: '🅶', H: '🅷', I: '🅸', J: '🅹', K: '🅺', L: '🅻', M: '🅼', N: '🅽', O: '🅾', P: '🅿', Q: '🆀', R: '🆁', S: '🆂', T: '🆃', U: '🆄', V: '🆅', W: '🆆', X: '🆇', Y: '🆈', Z: '🆉' };
const wideMap: Record<string, string> = { a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ', n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ', A: 'Ａ', B: 'Ｂ', C: 'Ｃ', D: 'Ｄ', E: 'Ｅ', F: 'Ｆ', G: 'Ｇ', H: 'Ｈ', I: 'Ｉ', J: 'Ｊ', K: 'Ｋ', L: 'Ｌ', M: 'Ｍ', N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ', ' ': '　' };
const monospaceMap: Record<string, string> = { a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝘬', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚞', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣', A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉', '0': '𝟶', '1': '𝟷', '2': '𝟟', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟟', '8': '𝟾', '9': '𝟿' };
const greekMap: Record<string, string> = { a: 'α', b: 'в', c: 'c', d: 'd', e: 'ε', f: 'ғ', g: 'g', h: 'н', i: 'ι', j: 'j', k: 'κ', l: 'l', m: 'м', n: 'η', o: 'σ', p: 'ρ', q: 'q', r: 'я', s: 's', t: 'т', u: 'υ', v: 'ν', w: 'ω', x: 'x', y: 'y', z: 'z', A: 'Α', B: 'Β', C: 'C', D: 'D', E: 'Ε', F: 'F', G: 'G', H: 'Η', I: 'Ι', J: 'J', K: 'Κ', L: 'L', M: 'Μ', N: 'Ν', O: 'Ο', P: 'Ρ', Q: 'Q', R: 'R', S: 'S', T: 'Τ', U: 'υ', V: 'ν', W: 'Ω', X: 'Χ', Y: 'Υ', Z: 'Ζ' };
const cherokeeMap: Record<string, string> = { a: 'Ꭺ', b: 'Ᏼ', c: 'Ꮯ', d: 'Ꭰ', e: 'Ꭼ', f: 'Ꮀ', g: 'Ꮐ', h: 'Ꮋ', i: 'Ꮖ', j: 'Ꭻ', k: 'Ꮶ', l: 'Ꮮ', m: 'Ꮇ', n: 'Ꮑ', o: 'Ꮎ', p: 'Ꮲ', q: 'Ꮗ', r: 'Ꭱ', s: 'Ꮪ', t: 'Ꭲ', u: 'Ꮼ', v: 'Ꮩ', w: 'Ꮃ', x: 'Ꮿ', y: 'Ꭹ', z: 'Ꮓ', A: 'Ꭺ', B: 'Ᏼ', C: 'Ꮯ', D: 'Ꭰ', E: 'Ꭼ', F: 'Ꮀ', G: 'Ꮐ', H: 'Ꮋ', I: 'Ꮖ', J: 'Ꭻ', K: 'Ꮶ', L: 'Ꮮ', M: 'Ꮇ', N: 'Ꮑ', O: 'Ꮎ', P: 'Ꮲ', Q: 'Ꮗ', R: 'Ꭱ', S: 'Ꮪ', T: 'Ꭲ', U: 'Ꮼ', V: 'Ꮩ', W: 'Ꮃ', X: 'Ꮿ', Y: 'Ꭹ', Z: 'Ꮓ' };
const pseudoAsianMap: Record<string, string> = { a: 'ﾑ', b: '乃', c: '匚', d: 'D', e: '乇', f: '下', g: 'ム', h: '卄', i: '工', j: 'ﾌ', k: 'Ҝ', l: '乚', m: '爪', n: '刀', o: '口', p: '尸', q: 'Q', r: '尺', s: '丂', t: 'ㄒ', u: 'ひ', v: '∨', w: '山', x: '乂', y: '丫', z: '乙', A: 'ﾑ', B: '乃', C: '匚', D: 'D', E: '乇', F: '下', G: 'ム', H: '卄', I: '工', J: 'ﾌ', K: 'Ҝ', L: '乚', M: '爪', N: '刀', O: '口', P: '尸', Q: 'Q', R: '尺', S: '丂', T: 'ㄒ', U: 'ひ', V: '∨', W: '山', X: '乂', Y: '丫', Z: '乙' };
const pseudoCyrillicMap: Record<string, string> = { a: 'Д', b: 'Б', c: 'C', d: 'Д', e: 'З', f: 'Ф', g: 'G', h: 'H', i: 'И', j: 'J', k: 'K', l: 'Л', m: 'M', n: 'H', o: 'O', p: 'П', q: 'Q', r: 'Я', s: 'C', t: 'T', u: 'Ц', v: 'B', w: 'Ш', x: 'X', y: 'Y', z: 'Z', A: 'Д', B: 'Б', C: 'C', D: 'Д', E: 'З', F: 'Ф', G: 'G', H: 'H', I: 'И', J: 'J', K: 'K', L: 'Л', M: 'M', N: 'H', O: 'O', P: 'П', Q: 'Q', R: 'Я', S: 'C', T: 'T', U: 'Ц', V: 'B', W: 'Ш', X: 'X', Y: 'Y', Z: 'Z' };
const parenthesizedMap: Record<string, string> = { a: '⒜', b: '⒝', c: '⒞', d: '⒟', e: '⒠', f: '⒡', g: '⒢', h: '⒣', i: '⒤', j: '⒥', k: '⒦', l: '⒧', m: '⒨', n: '⒩', o: '⒪', p: '⒫', q: '⒬', r: '⒭', s: '⒮', t: '⒯', u: '⒰', v: '⒱', w: '⒲', x: '⒳', y: '⒴', z: '⒵', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ', '1': '⑴', '2': '⑵', '3': '⑶', '4': '⑷', '5': '⑸', '6': '⑹', '7': '⑺', '8': '⑻', '9': '⑼', '0': '⑽' };
const brailleMap: Record<string, string> = { a: '⠁', b: '⠃', c: '⠉', d: '⠙', e: '⠑', f: '⠋', g: '⠛', h: '⠓', i: '⠊', j: '⠚', k: '⠅', l: '⠇', m: '⠍', n: '⠝', o: '⠕', p: '⠏', q: '⠟', r: '⠗', s: '⠎', t: '⠞', u: '⠥', v: '⠧', w: '⠺', x: '⠭', y: '⠽', z: '⠵', A: '⠁', B: '⠃', C: '⠉', D: '⠙', E: '⠑', F: '⠋', G: '⠛', H: '⠓', I: '⠊', J: '⠚', K: '⠅', L: '⠇', M: '⠍', N: '⠝', O: '⠕', P: '⠏', Q: '⠟', R: '⠗', S: '⠎', T: '⠞', U: '⠥', V: '⠧', W: '⠺', X: '⠭', Y: '⠽', Z: '⠵', ' ': ' ' };
const runicMap: Record<string, string> = { a: 'ᚨ', b: 'ᛒ', c: 'ᚲ', d: 'ᛞ', e: 'ᛖ', f: 'ᚠ', g: 'ᚷ', h: 'ᚺ', i: 'ᛁ', j: 'ᛃ', k: 'ᚴ', l: 'ᛚ', m: 'ᛗ', n: 'ᚾ', o: 'ᛟ', p: 'ᛈ', q: 'ᛩ', r: 'ᚱ', s: 'ᛊ', t: 'ᛏ', u: 'ᚢ', v: 'ᚡ', w: 'ᚹ', x: 'ᛪ', y: 'ᛇ', z: 'ᛉ', A: 'ᚨ', B: 'ᛒ', C: 'ᚲ', D: 'ᛞ', E: 'ᛖ', F: 'ᚠ', G: 'ᚷ', H: 'ᚺ', I: 'ᛁ', J: 'ᛃ', K: 'ᚴ', L: 'ᛚ', M: 'ᛗ', N: 'ᚾ', O: 'ᛟ', P: 'ᛈ', Q: 'ᛩ', R: 'ᚱ', S: 'ᛊ', T: 'ᛏ', U: 'ᚢ', V: 'ᚡ', W: 'ᚹ', X: 'ᛪ', Y: 'ᛇ', Z: 'ᛉ' };
const morseMap: Record<string, string> = { a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.' };
const stackedMap: Record<string, string> = { a: 'aͣ', c: 'cͨ', d: 'dͩ', e: 'eͪ', h: 'hͪ', i: 'iͥ', m: 'mͪ', o: 'oͪ', r: 'rͬ', t: 'tͭ', u: 'uͧ', v: 'vͮ', x: 'xͯ', A: 'Aͣ', C: 'Cͨ', D: 'Dͩ', E: 'Eͪ', H: 'Hͪ', I: 'Iͥ', M: 'Mͪ', O: 'Oͪ', R: 'Rͬ', T: 'Tͭ', U: 'Uͧ', V: 'Vͮ', X: 'Xͯ' };
const upsideDownMap: Record<string, string> = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'd', Q: 'Ό', R: 'ɹ', S: 'S', T: '┴', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z', '?': '¿', '!': '¡', '.': '˙', ',': "'", '_': '‾' };
const subscriptMap: Record<string, string> = { a: 'ₐ', b: 'b', c: 'c', d: 'd', e: 'ₑ', f: 'f', g: 'g', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', q: 'q', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', w: 'w', x: 'ₓ', y: 'y', z: 'z', A: 'ₐ', B: 'b', C: 'c', D: 'd', E: 'ₑ', F: 'f', G: 'g', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ', O: 'ₒ', P: 'ₚ', Q: 'q', R: 'ᵣ', S: 'ₛ', T: 'ₜ', U: 'ᵤ', V: 'ᵥ', W: 'w', X: 'ₓ', Y: 'y', Z: 'z', '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const superscriptMap: Record<string, string> = { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: 'ᵠ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ', A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', Q: 'Q', R: 'ᴿ', S: 'ˢ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ', X: 'ˣ', Y: 'ʸ', Z: 'ᶻ' };
const currencyMap: Record<string, string> = { a: '₳', b: '฿', c: '₵', d: '₫', e: '€', f: '₣', g: '₲', h: 'Ⱨ', i: '❙', j: 'Ĵ', k: '₭', l: '₤', m: '₥', n: '₦', o: 'Ø', p: '₱', q: 'Ǭ', r: '₹', s: '$', t: '₮', u: '℘', v: 'Ṽ', w: '₩', x: 'Ӿ', y: '¥', z: '₴', A: '₳', B: '฿', C: '₵', D: '₫', E: '€', F: '₣', G: '₲', H: 'Ⱨ', I: '❙', J: 'Ĵ', K: '₭', L: '₤', M: '₥', N: '₦', O: 'Ø', P: '₱', Q: 'Ǭ', R: '₹', S: '$', T: '₮', U: '℘', V: 'Ṽ', W: '₩', X: 'Ӿ', Y: '¥', Z: '₴' };

// Converter Wrappers
const toScript = createMapper(scriptMap);
const toBoldScript = createMapper(boldScriptMap);
const toFraktur = createMapper(frakturMap);
const toBoldFraktur = createMapper(boldFrakturMap);
const toDoubleStruck = createMapper(doubleStruckMap);
const toSansBold = createMapper(sansSerifBoldMap);
const toSansItalic = createMapper(sansSerifItalicMap);
const toSerifBold = createMapper(serifBoldMap);
const toSerifItalic = createMapper(serifItalicMap);
const toSerifBoldItalic = createMapper(serifBoldItalicMap);
const toSmallCaps = createMapper(smallCapsMap);
const toBubbles = createMapper(bubblesMap);
const toBlackBubbles = createMapper(bubblesBlackMap);
const toSquare = createMapper(squareMap);
const toBlackSquare = createMapper(blackSquareMap);
const toWide = createMapper(wideMap);
const toMonospace = createMapper(monospaceMap);
const toGreek = createMapper(greekMap);
const toCherokee = createMapper(cherokeeMap);
const toPseudoAsian = createMapper(pseudoAsianMap);
const toPseudoCyrillic = createMapper(pseudoCyrillicMap);
const toParenthesized = createMapper(parenthesizedMap);
const toBraille = createMapper(brailleMap);
const toRunic = createMapper(runicMap);
const toCurrency = createMapper(currencyMap);
const toUpsideDown = (text: string) => reverse(createMapper(upsideDownMap)(text));
const toMorse = (text: string) => text.toLowerCase().split('').map(c => morseMap[c] || c).join(' ');
const toStacked = (text: string) => text.split('').map(c => stackedMap[c] || c).join('');
const toDotted = (text: string) => text.split('').map(char => char + '\u0323').join('');
const toUnderline = (text: string) => text.split('').map(char => char + '\u0332').join('');
const toStrikethrough = (text: string) => text.split('').map(char => char + '\u0336').join('');
const toSlash = (text: string) => text.split('').map(char => char + '\u0338').join('');
const toLightning = (text: string) => interleave(text, '↯');


// ==========================================
// 3. GENERATORS (LOGIC)
// ==========================================

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
// 4. FONT CATEGORY DEFINITIONS (MODULAR)
// ==========================================

// --- Priority 1: Cursive Essentials (Strictly Ordered) ---
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

// --- FACEBOOK ESSENTIALS & CREATIVE (Optimized for Spanish) ---
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

// --- Specific User Requests for Facebook ---
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

// --- GOTHIC COLLECTION (User Specific Request) ---
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

// --- TATTOO ESSENTIALS (User Requested Expansion) ---
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
    // Keep decorative generated ones but ensure TATTOO_ESSENTIALS appears first
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

// ==========================================
// 5. EXPORT AGGREGATION
// ==========================================

export const fonts: FontStyle[] = [
    ...CURSIVE_ESSENTIALS,
    ...FACEBOOK_ESSENTIALS,
    ...FACEBOOK_SPECIFIC_REQUESTS,
    ...GOTHIC_COLLECTION, // Prioritized Gothic Collection
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
