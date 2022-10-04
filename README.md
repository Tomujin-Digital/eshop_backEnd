Суулгасан байх шаардлагатай програм:

> Nodejs 16.14+

> pnpm v7+

> yarn v1.22+

Ашиглах Package Manager **pnpm** эсвэл **yarn**

> npm install -g pnpm

> npm install -g yarn

Node Modules setup:

> pnpm install

> yarn install

 Compodoc aсаах комманд 
> pnpm compodoc -s -d ./doc  

# Framework дээр ажиллах

```

src
  |
  /resource  <-- бүх Module, Service, Controller бичигдэнэ
  |  |
  |  /module  <-- жишээлбэл user, lessons гэх мэтээр бүлэглэнэ.
  |  |  |
  |  |  /model  <-- Өгөгдлийн сангийн бүтэц
  |  |  |
  |  |  /dto    <-- Хэрэглэгчээс орж ирэх
  |  |  |
  |  |  --module.service.ts
  |  |  --module.controller.ts
  |  |  --module.module.ts
  |  |  |
  |  |  |

```
