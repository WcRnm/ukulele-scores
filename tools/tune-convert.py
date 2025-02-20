import argparse
import yaml
import json
import os

def process(args):
    print(args.json)
    path = os.path.dirname(args.json)
    print(path)
    with open(args.json) as f:
        data = json.load(f)

        for entry in data:
            genre = entry['genre'];
            print(f'  {genre}')
            tunes = entry['tunes'];

            for tune in tunes:
                name = tune['name'].replace(' ', '_') + '.md'
                print(f'    {name}')
                tune['genre'] = genre
                filepath = os.path.join(path, name)
                print(f'    {filepath}')

                with open(filepath, 'w') as y:
                    y.write('---\n')
                    yaml.dump(tune, y)
                    y.write('---\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-j', '--json', required=True)

    args = parser.parse_args();

    process(args)
