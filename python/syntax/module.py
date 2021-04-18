

vars = [1,2,3]

bo = True

dd = {
  "bo":True
}

def remove_one(val):
  if val in vars:
    vars.remove(val)


def update():
  # vars.clear()
  # vars.append(4)
  vars.extend([5,6])
  bo = False
  dd["bo"] = False


