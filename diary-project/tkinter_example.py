from tkinter import *
#this is an example of tkinter
root = Tk()
root.title('Diary')
root.geometry("500x300")

var=StringVar()
w=Label(root,textvariable=var, background='green',font=('Arial',12),width=15,height=2)
w.pack()

on_hit=False
def hit_me():
    global on_hit
    if on_hit==False:
        on_hit=True
        var.set("Hello world")
    else:
        on_hit=False
        var.set('')

b=Button(root,text='Click',width=15, height=2, command=hit_me)
b.pack()
root.mainloop()
