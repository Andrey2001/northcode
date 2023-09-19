import gzip, codecs
import os
def create_dict():

    with gzip.open("./home/src/russian.txt.gz") as file:
        with codecs.getreader('utf-8')(file) as text_file:
            rus_dict = text_file.read().split()

    ALPHABET = 'йцукенгшщзхъфывапролджэячсмитьбюё-'

    rus_by2letters = dict()
    for l in ALPHABET:
        rus_by2letters[l] = dict()
        for ll in ALPHABET:
            rus_by2letters[l][ll] = []

    for r in rus_dict:
        if r[0].isalpha():
            if len(r) > 1:
                if r[1] in rus_by2letters[r[0].lower()].keys():
                    rus_by2letters[r[0].lower()][r[1]].append(r)

    return (rus_by2letters, rus_dict)