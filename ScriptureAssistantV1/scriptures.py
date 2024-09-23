import tkinter as tk
import webbrowser
import re
from contents import get_contents

def find_key_and_parent(d, search_key):
    for parent_key, value in d.items():
        if isinstance(value, dict):
            if search_key in value:
                return parent_key, value[search_key]
            # Recursively search in the nested dictionary
            result = find_key_and_parent(value, search_key)
            if result:
                return result
    return None

def open_verse_url(event=None):
    verse = entry.get().strip()
    
    # Regex to match "Book Chapter:Verse"
    match = re.match(r'(.+?)\s+(\d+):(\d+)', verse)
    
    if not match:
        print("Invalid verse format.")
        return
    
    book, chapter, verse_number = match.groups()
    book = book.strip().lower()

    testament, book_value = find_key_and_parent(get_contents(), book)

    if testament is None:
        print("Book not found.")
        return

    url = f"https://www.churchofjesuschrist.org/study/scriptures/{testament}/{book_value}/{chapter}?lang=eng&id=p{verse_number}#p{verse_number}"
    webbrowser.open(url)

# Create the main window
root = tk.Tk()
root.title("Scriptural Verse Finder")

# Create a label
label = tk.Label(root, text="Enter a scriptural verse:")
label.pack(pady=10)

# Create an entry widget
entry = tk.Entry(root, width=50)
entry.pack(pady=10)

# Bind the Enter key to the open_verse_url function
entry.bind("<Return>", open_verse_url)

# Create a button that will trigger the URL opening
button = tk.Button(root, text="Open Verse URL", command=open_verse_url)
button.pack(pady=20)

# Run the application
root.mainloop()
