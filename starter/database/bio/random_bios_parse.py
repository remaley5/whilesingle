# random bios generated with https://www.fakepersongenerator.com/user-biography-generator?new=refresh
# these random bios are saved in txt file (random_bios.txt)
# running this function will parse those txt bios and write them to random_bios.py as a list of bio strings with numbers and quotations removed.
# random_bios.py contains the output as a list (bio_list)
# bio_list is imported into random_user.py and used as the seed data.
# NOTE: this file must be run from within this directory, otherwise it can't find random_bios.txt
def parse_bios():
    bio_list = []
    with open('./random_bios.txt', 'r') as file:
        arr = list(file)
        for i in range(len(arr)):
            el = arr[i]
            # skip line breaks
            if len(el)<=1:
                continue
            else:
                # find opening quotation; + 1 so quotation excluded
                idx_start = el.index('"')+1
                # find closing quotation - + idx_start to account for change in el length
                idx_end = el[idx_start:].index('"') + idx_start
                bio_str = el[idx_start:idx_end]
                bio_list.append(bio_str)
    with open ('random_bios.py', 'w') as file:
        file.write(f'bio_list={bio_list}')
    # return bio_list
# print(parse_bios())
parse_bios()
# parse_bios()
