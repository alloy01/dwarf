import string
import random
import argparse

parser = argparse.ArgumentParser()

parser.add_argument('url', type=str, help='enter the url that needs to shortened')
parser.add_argument('-l', '--length', required=True, type=int, help='enter the desired length of the shortened url')

args = parser.parse_args()

def gen_link(length: int) -> str:
    salt = string.ascii_letters + string.digits
    alpha_numeric = ''.join(random.choices(salt, k=length))
    return f'{alpha_numeric}'

x = True

short_link = ''

while x == True:
    link = gen_link(args.length)

    with open('data.txt', 'r') as file:
        for line in file:
            clean_line = line.strip()
            stored_link = clean_line.split('-->')[1]

            if stored_link == link:
                break

        else:
            x = False
            short_link = link


with open('data.txt', 'a') as file:
    file.write(f'{args.url} --> {short_link}\n')