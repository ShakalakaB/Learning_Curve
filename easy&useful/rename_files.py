import os, re

directory=r'C:\Users\lyj\Desktop\Rename_folder'
i=1

for filename in os.listdir(directory):
    i=i+1
    ischinese=re.search(u'[\u4e00-\u9fff]',filename)
    if ischinese is None:
        refile=str(i)+'.jpg'
        os.rename(os.path.join(directory,filename),os.path.join(directory,str(i)+'.jpg'))
        i=i+1
