const getContents = () => ({
    'ot': { 
        'genesis': 'gen',
        'exodus': 'ex',
    },
    'nt': { 
        'matthew': 'matt',
        'mark': 'mark',
        'luke': 'luke',
        'john': 'john',
        'acts': 'acts'
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
    'd&c': 'dc-testament/dc'
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

document.getElementById('openUrlBtn').addEventListener('click', () => {
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
});
