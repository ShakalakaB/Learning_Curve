from tkinter import *
from time import gmtime, strftime


root = Tk()
root.title('Diary')
root.geometry("700x300")

e=Entry(root,show=None,width=50,borderwidth=5)
e.pack()


def Insert():
    #open('diary.txt','r').close()
    text=e.get()+'\n'
    time=strftime('%Y-%m-%d %H:%M:%S',gmtime())
    with open('diary.txt','a') as f:
        f.write(time+':  '+text)
        f.close()
        with open('diary.txt') as f:
            diary_content=f.read()
            t.delete(1.0, END)
            t.insert('insert',diary_content)
    e.delete(0,END)

b1=Button(root,text='Write',width=15, height=2, command=Insert)
b1.pack()

s=Scrollbar(root)
t=Text(root,height=2)
with open('diary.txt') as f:
    diary_content=f.read()
    t.insert('insert',diary_content)
    f.close()
s.pack(side=RIGHT,fill=Y)
t.pack(side=LEFT,fill=Y)
s.config(command=t.yview)
#t.config(ysrollcommand=s.set)

root.mainloop()
