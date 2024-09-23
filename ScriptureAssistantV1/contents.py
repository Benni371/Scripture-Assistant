def get_contents():
    DICT_OF_CONTENTS = {
    'ot': {  # Old Testament
        'genesis': 'gen',
        'exodus': 'ex',
    },
    'nt': {  # New Testament
        'matthew': 'matt',
        'mark': 'mark',
        'luke': 'luke',
        'john': 'john',
        'acts': 'acts'
    },
    'bofm': {  # Book of Mormon
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
    'd&c': 'dc-testament/dc'  # Doctrine and Covenants (dc-testament/dc/<chapter>/verse)
}
    return DICT_OF_CONTENTS
