from tkinter import *
#this is an example of tkinter
root = Tk()
root.title('Diary')
root.geometry("500x300")

e=Entry(root,show=None)
e.pack()

def insert_point():
    var=e.get()
    t.insert('insert',var)

def insert_end():
    var=e.get()
    t.insert('end',var)

b1=Button(root,text='insert point',width=15, height=2, command=insert_point)
b1.pack()
b2=Button(root,text='insert end',width=15, height=2, command=insert_end)
b2.pack()

s=Scrollbar(root)
t=Text(root,height=2)
s.pack(side=RIGHT,fill=Y)
t.pack(side=LEFT,fill=Y)
s.config(command=t.yview)
#t.config(ysrollcommand=s.set)
root.mainloop()
