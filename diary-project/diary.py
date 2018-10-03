import os, sys
from time import gmtime, strftime

def display_diary(filename):
    """read and print the diary out."""
    openfile=open(filename)
    diary_content=openfile.read()
    print('DIARY_CONTENT: ', diary_content)
    openfile.close()

#filename=open('C:\\Users\\lyj\\Desktop\\openclub\\diary.txt')
display_diary('diary.txt')
filename=open('diary.txt','a')
sentence=input('Please write a line of text to diary or press Enter to quit:')
if sentence=='':
    filename.close()
else:
    datetime=strftime('%Y-%m-%d %H:%M:%S',gmtime())
    filename.write(datetime+': '+sentence+'\n')
    filename.close()
    display_diary('diary.txt')
