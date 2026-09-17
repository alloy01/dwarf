import string
import random
import argparse
import json

parser = argparse.ArgumentParser()

parser.add_argument('method', type=str, help='enter the method to be used shorten, fetch')
parser.add_argument('-s', '--string', required=True, type=str, help='enter the url that needs to shortened or short_id of url')
parser.add_argument('-l', '--length', type=int, help='enter the desired length of the shortened url')

args = parser.parse_args()

def gen_id(length: int) -> str:
    salt = string.ascii_letters + string.digits
    alpha_numeric = ''.join(random.choices(salt, k=length))
    return alpha_numeric

def load_data() -> dict:
    with open('data.json', 'r') as file:
        data = json.load(file)

        return data

if args.method == 'shorten':
    duped_id = True

    short_id = ''

    while duped_id == True:
        proto_id = gen_id(args.length)

        data = load_data()
        for line in data:
            if line == proto_id:
                break
        else:
            duped_id = False
            short_id = proto_id

    data[short_id] = args.string

    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)

elif args.method == 'fetch':
    data = load_data()

    resp = 'invalid short id'
    for id in data:
        if id == args.string:
            resp = data[id]

    print(resp)
