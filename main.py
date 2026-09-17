import string
import random
import argparse
import json

parser = argparse.ArgumentParser()

parser.add_argument('url', type=str, help='enter the url that needs to shortened')
parser.add_argument('-l', '--length', required=True, type=int, help='enter the desired length of the shortened url')

args = parser.parse_args()

def gen_id(length: int) -> str:
    salt = string.ascii_letters + string.digits
    alpha_numeric = ''.join(random.choices(salt, k=length))
    return alpha_numeric

duped_id = True

short_id = ''

while duped_id == True:
    proto_id = gen_id(args.length)

    with open('data.json', 'r') as file:
        data = json.load(file)
        for line in data:
            if line == proto_id:
                break
        else:
            duped_id = False
            short_id = proto_id

data[short_id] = args.url

with open('data.json', 'w') as file:
    json.dump(data, file, indent=4)
