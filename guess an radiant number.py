from random import randint

pc_num=randint(1,20)

#the loop will end when the 'time' reach 6, means it won't execute at 6
for time in range(1,7):
    try:
        user_num=int(input("Please guess an integral number between 1 and 20: "))
    except ValueError:
        print("Please enter an integral number")
    else:
        if pc_num == user_num:
            #if succeed, to continue of exit?
            print("Congratulations, it is the right number!!!")
            break
        elif pc_num > user_num :
            print("It's close, the right number is between %d and 20, and you have %d more chance" %(user_num, 6-time))
        elif pc_num < user_num :
            print("It's close, the right number is between 1 and %d, and you have %d more chance" %(user_num, 6-time))
