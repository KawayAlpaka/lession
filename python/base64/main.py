import base64
def encode64(e):
  return base64.b64encode(e.encode("utf-8"))

if __name__ == "__main__":
  print(encode64("pc_tusou;1596096332910"))