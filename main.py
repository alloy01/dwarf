import string
import random
import argparse

parser = argparse.ArgumentParser()

parser.add_argument('url', type=str, help='enter the url that needs to shortened')
parser.add_argument('-l', '--length', required=True, type=int, help='enter the desired length of the shortened url')

args = parser.parse_args()

def gen_id(length) -> string:
    char = string.ascii_letters + string.digits
    return ''.join(random.choices(char, k=length))

print(gen_id(args.length))