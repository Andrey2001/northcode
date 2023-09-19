import re
from Levenshtein import distance

def minlevdist(badword, dct):
    mindist = 100
    resword = ""
    for w in dct:
        dist = distance(badword, w)
        if dist < mindist:
            mindist = dist
            resword = w
    return mindist, resword

def preproccessing(text, rus_by2letters, lm):
    text = re.sub(r"(?<=[а-яё0-9a-zA-Z])(?=[А-ЯЁ])", ". ", text)
    text = re.sub(r"(?<=[0-9a-zA-Z])(?=[а-яё])", " ", text)
    text = re.sub(r"(?<=[0-9а-яёА-ЯЁ])(?=[a-z])", " ", text)
    #text = re.sub(r"(?<=[0-9а-яёА-ЯЁa-z])(?=[A-Z])", ". ", text)
    text = re.sub(r"(?<=[а-яёА-ЯЁa-z])(?=[0-9])", " ", text)
    # text = re.sub(r"(?<=[!;\)])(?=[A-Za-zА-ЯЁа-яё0-9])", " ", text)
    # text = re.sub(r"(?<=[:])(?=[A-Za-zА-ЯЁа-яё])", " ", text)
    text = re.sub(r"(?<=[\):])(?=[A-Za-zА-ЯЁа-яё0-9])", " ", text)
    text = re.sub(r"(?<=[!;])(?=[A-Za-zА-ЯЁа-яё0-9 ])", "\n", text)
    text = re.sub(r"(?<=[.])(?=[А-ЯЁа-яё])", "\n", text)
    text = re.sub(r'(\d{1}): (\d{2})', r'\1:\2', text)
    text = re.sub(r':\s', r': ', text)
    text = re.sub(r'\"{2,}', r'"', text)
    words = re.split(r'\W', text)
    #words = [re.sub(r'\W+', '', word) for word in words]
    for word in words:
        if re.match(r'^[а-яА-ЯёЁ\-]+$', word) and not word.isupper() and len(word) > 1:
            tmp = word.replace('ё', 'е').lower()
            if tmp not in rus_by2letters[tmp[0]][tmp[1]]:
                #rus.update({tmp})
                dist, minword = minlevdist(tmp, rus_by2letters[tmp[0]][tmp[1]])
                if dist < 3:
                    text = text.replace(word, minword)
                else:
                    new_words = ' '.join(lm.split(word))
                    text = text.replace(word, new_words)
    #text = text.replace('- ', '-- ').replace(' --', '--').replace(' -', ' --')
    return text

def add_html_markup(text):
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    text = re.sub(r'\s{2,}', ' ', text).strip()
    specsymbols = dict()
    parts = text.split(': ', 1)
    header = ""
    email = re.findall(pattern, text)
    for e in email:
        text = text.replace(e, "<b>" + e + "</b>")
    if ": " in text:
        header = parts[0].strip()
        another = parts[1]
    else:
        another = parts[0]
        if '\n' in text:
            html_text = "<ul>\n"
            tasks = text.split('\n')
            for task in tasks:
                if task.strip() != "":
                    html_text += "  <li>" + task.strip() +  "</li>\n"
            return html_text + "</ul>"
        # elif '--' in text:
        #     html_text = "<ul>\n"
        #     tasks = text.split('--')
        #     for task in tasks:
        #         if task.strip() != "":
        #             html_text += "  <li>" + task.strip() +  "</li>\n"
        #     return html_text + "</ul>"
        else:
            return "<p>" + text.strip() + "</p>"
        
    prevchar = ""
    for char in text:
        if char == ';' or char == '.' and not prevchar.isdigit() or char == '-' or char == ';' or char == '\n':
            if char not in specsymbols.keys():
                specsymbols[char] = 0
            specsymbols[char] += 1
        prevchar = char
    delim = ';'
    cnt = -1
    for key in specsymbols.keys():
        if cnt < specsymbols[key]:
            cnt = specsymbols[key]
            delim = key
    if cnt != -1:
        tasks = another.split(delim)
        
        html_text = ""
        if header != "":
            html_text += "<p><b>" + header + ":</b></p>\n"
        num_task = len(tasks)
        html_text += "<ul>\n"
        for task in tasks:
            if task.strip() != "":
                if delim != '\n' and tasks[num_task-1] != task:
                    html_text += "  <li>" + task.strip() + delim + "</li>\n"
                else:
                    html_text += "  <li>" + task.strip() + "</li>\n"
        html_text += "</ul>"
    else:
        html_text = "<p>" + text.strip() + "</p>"
    
    
    return html_text
