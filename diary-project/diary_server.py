import os, sys
from time import gmtime, strftime
import socket
import threading

"""read diary out."""
openfile=open('diary.txt')
diary_content=openfile.read()
diary_content_byte=diary_content.encode()
openfile.close()


#create a TCP/IP socket
s=socket.socket()
print('Socket successfully created')

#researve a port on your computer
port=12345

'''
next bind to the port, we have not type any ip in the ip filed
insted we have inputted an empty string, this makes the server listen to requests
coming from other computers on the network
'''

s.bind(('',port))
print('socket binded to %s' %port)

#put the socket into listening mode
s.listen(5)
print('socket is listening')

def tcplink(sock,address):
    #notiong: convert address to string
    print('Got connection from %s' %str(address))
    #send a welcome message to the client,be careful to use '+' to combine not '.'
    sock.send('welcome to your diary!'.encode()+'\n'.encode()+
            diary_content_byte +'\n'.encode()+
           'Please write a line of text to diary or press Enter to quit:'.encode())

    while True:
        user_input=sock.recv(1024)
        if user_input=='Q'.encode() :
            sock.send('You have exit the diary'.encode())
            break
        if not user_input:
            break
        else:
            datetime=strftime('%Y-%m-%d %H:%M:%S',gmtime())
            openfile=open('diary.txt','a')
            openfile.write(datetime+': '+user_input.decode()+'\n')
            openfile.close()
            sock.send('It has been saved.'.encode())

    #close the connection with the client
    sock.close()

#A forever loop until we interrupt it or an error occurs
while True:
    #establish connection with client
    c, addr=s.accept()
    #in this case, we'll pretend this is a threaded server
    t=threading.Thread(target=tcplink,args=(c,addr))
    t.start()
