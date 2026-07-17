import re
html=open(".tmp/pp_home.html",encoding="utf-8",errors="ignore").read()
m=re.search(r'id="services".*?id="(?:roof-types|service-area|proof)"',html,re.S)
chunk=m.group(0) if m else html
txt=re.sub(r"<script.*?</script>"," ",chunk,flags=re.S)
txt=re.sub(r"<style.*?</style>"," ",txt,flags=re.S)
txt=re.sub(r"<[^>]+>"," ",txt)
txt=re.sub(r"\s+"," ",txt).strip()
print(txt[:2400])
