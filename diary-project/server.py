import socket
import sys

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

#A forever loop until we interrupt it or an error occurs
while True:
    #establish connection with client
    c, addr=s.accept()
    print('got connection from ' , addr)

    #send a thank you message to the client
    c.send('thank you for connecting'.encode())
    #close the connection with the client
    c.close()
