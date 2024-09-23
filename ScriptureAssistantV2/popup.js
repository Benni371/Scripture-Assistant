const getContents = () => ({
    'ot': { 
        'genesis': 'gen',
        'exodus': 'ex',
        'leviticus':'lev',
        'numbers':'num',
        'deuteronomy':'deut',
        'joshua':'josh',
        'judges':'judg',
        'ruth': 'ruth',
        '1 samuel':'1-sam',
        '2 samuel':'2-sam',
        '1 kings':'1-kgs',
        '2 kings':'2-kgs',
        '1 chronicles':'1-chr',
        '2 chronicles':'2-chr',
        'ezra':'ezra',
        'nehemiah':'neh',
        'esther':'esth',
        'job':'job',
        'psalms':'ps',
        'proverbs':'prov',
        'ecclesiastes':'eccl',
        'song of solomon':'song',
        'isaiah':'isa',
        'jeremiah':'jer',
        'lamentations':'lam',
        'ezekiel':'ezek',
        'daniel':'dan',
        'hosea':'hosea',
        'joel':'joel',
        'amos':'amos',
        'obadiah':'obad',
        'jonah':'jonah',
        'micah':'micah',
        'nahum':'nahum',
        'habakkuk':'hab',
        'zephaniah':'zeph',
        'haggai':'hag',
        'zechariah':'zech',
        'malachi':'mal'
    },
    'nt': { 
        'matthew': 'matt',
        'mark': 'mark',
        'luke': 'luke',
        'john': 'john',
        'acts': 'acts',
        'romans':'rom',
        '1 corinthians':'1-cor',
        '2 corithians':'2-cor',
        'galatians':'gal',
        'ephesians':'eph',
        'philippians':'philip',
        'colossians':'col',
        '1 thessalonians':'1-thes',
        '2 thessalonians':'2-thes',
        '1 timothy':'1-tim',
        '2 timothy':'2-tim',
        'titus':'titus',
        'philemon':'philem',
        'hebrews':'heb',
        'james':'james',
        '1 peter':'1-pet',
        '2 peter':'2-pet',
        '1 john':'1-jn',
        '2 john':'2-jn',
        '3 john':'3-jn',
        'jude':'jude',
        'revelation':'rev'

    },
    'bofm': { 
        '1 nephi': '1-ne',
        '2 nephi': '2-ne',
        'jacob': 'jacob',
        'enos': 'enos',
        'jarom': 'jarom',
        'omni': 'omni',
        'words of mormon': 'w-of-m',
        'mosiah': 'mosiah',
        'alma': 'alma',
        'helaman': 'hel',
        '3 nephi': '3-ne',
        '4 nephi': '4-ne',
        'mormon': 'morm',
        'ether': 'ether',
        'moroni': 'moro'
    },
    'dc-testament': {
        'd&c' : 'dc'
    }
});

const findKeyAndParent = (d, searchKey) => {
    for (const parentKey in d) {
        const value = d[parentKey];
        if (typeof value === 'object' && value !== null) {
            if (searchKey in value) {
                return [parentKey, value[searchKey]];
            }
            const result = findKeyAndParent(value, searchKey);
            if (result) {
                return result;
            }
        }
    }
    return null;
};

const openUrl = () => {
    const verse = document.getElementById('verseInput').value.trim();
    const match = verse.match(/(.+?)\s+(\d+):(\d+)/);
    
    if (!match) {
        document.getElementById('message').innerText = "Invalid verse format.";
        return;
    }
    
    const book = match[1].trim().toLowerCase();
    const chapter = match[2];
    const verseNumber = match[3];
    
    const [testament, bookValue] = findKeyAndParent(getContents(), book) || [];
    
    if (!testament) {
        document.getElementById('message').innerText = "Book not found.";
        return;
    }

    const url = `https://www.churchofjesuschrist.org/study/scriptures/${testament}/${bookValue}/${chapter}?lang=eng&id=p${verseNumber}#p${verseNumber}`;
    window.open(url);
};

document.getElementById('openUrlBtn').addEventListener('click', openUrl);

// Add event listener for the Enter key
document.getElementById('verseInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        openUrl();
    }
});
