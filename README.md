# Suelen Creative Co. — atualização visual 2026

Versão de testes com redesign monocromático e responsivo. Preparada para substituir os arquivos de código do repositório atual **sem apagar a pasta `assets/`**, que já contém as fotos, logotipos e fontes originais.

## Arquivos do pacote

- `index.html` — nova página inicial, cinco cartões, seção “Quem sou eu” e agenda até 2026.
- `parto.html` — parto normal e cesárea na mesma página, escolha de modalidade, três pacotes em cada uma, galerias, depoimentos e condições visíveis.
- `normal.html` e `cesarea.html` — redirecionamento dos links antigos para a página unificada, já selecionando a modalidade correspondente.
- `casamento.html` — planos na sequência **Noiva, Luxo, Premium** (respectivos valores e conteúdo preservados).
- `quinze.html`, `social.html`, `trafego.html` — páginas de serviços com visual unificado e revisão de grafia identificada.
- `style.css` — estilos, degradês, efeitos de luz, adaptação para mobile e animações suaves.
- `app.js` — interações, mudança dos tipos de parto, galerias, links e datas.
- `data.js` — arquivo legado do projeto, mantido para não descartar nada; não é usado pelas páginas atuais.

## Valores de partos — 2026

| Modalidade | Fotografia | Vídeo | Foto + vídeo |
|---|---:|---:|---:|
| Parto normal | R$ 750,00 | R$ 750,00 | R$ 1.000,00 |
| Cesárea | R$ 400,00 | R$ 400,00 | R$ 650,00 |

### Condições de pagamento preservadas

- **Parto normal:** sinal de 10% e assinatura de contrato; à vista via Pix ou depósito; cartão em até 6 vezes com juros a consultar.
- **Cesárea:** sinal de R$ 50,00 para reservar; restante até um dia antes do parto; Pix ou cartão em até 3 vezes com juros a consultar.
- As observações, autorização da equipe/maternidade, prazos, remarcação e cancelamento estão visíveis na página de partos. Confirme o teor contratual final com a Suelen antes da divulgação definitiva.

## Instalação segura no VS Code — Windows

1. **Não apague sua pasta original.** Faça primeiro uma cópia de segurança do diretório do site, especialmente `assets/`.
2. No VS Code, confira que você está na branch `teste-traco-partos-traco-2026`, **não** na `main`.
3. Extraia este ZIP em uma pasta separada, fora do repositório.
4. Abra a pasta original `site-suelen-oliveira` no Explorador de Arquivos do Windows.
5. Copie os arquivos da pasta extraída para a raiz de `site-suelen-oliveira`, ao lado de `index.html`. Confirme **Substituir arquivos no destino** para os arquivos repetidos.
6. **Não exclua a pasta `assets/` existente.** Ela contém as imagens, logos e fontes usadas no site. Elas não estão duplicadas neste ZIP.
7. Volte ao VS Code. Abra `index.html` no navegador e teste todos os cartões, principalmente o botão **Partos**. Dentro de `parto.html`, teste a troca entre Parto normal e Cesárea, os três valores, galerias, formas de pagamento e consulta da agenda.
8. Confirme também a página `casamento.html` e as demais páginas, no computador e no celular.
9. Quando estiver aprovado: `Ctrl + Shift + G` → mensagem de commit → **Commit** → **Sync Changes** ou **Publish Branch** se solicitado. Isso envia só a branch de teste.
10. No GitHub, abra um **Pull Request** da branch `teste-traco-partos-traco-2026` para a `main`, confira as mudanças e só então faça **Merge**. O GitHub Pages, que já está configurado na `main`, publicará a nova versão após o deploy.

> Não altere `Settings > Pages > Branch` para publicar esta atualização. A origem atual deve continuar `main / (root)`.

## Importante sobre fotos e fontes

O ZIP reúne **todos os arquivos de código e páginas da atualização**, mas não duplica as imagens e fontes da pasta `assets/`, pois essa pasta já existe no seu repositório e computador. Para conferir a aparência correta, execute a versão na pasta original do projeto, com `assets/` presente. Se abrir a pasta extraída isoladamente, imagens/logotipo poderão não aparecer.

As fontes Inter e Manrope são carregadas pela internet quando disponível. Sem conexão, o site usa a tipografia local/sistema como alternativa. O site não precisa de Node, banco de dados nem build.

## Notas funcionais

- A consulta de agenda **não reserva automaticamente** uma data e não verifica disponibilidade em tempo real. Ela prepara uma mensagem para o WhatsApp da Suelen.
- O calendário fica limitado a **31 de dezembro de 2026**. A agenda de 2027 é anunciada como *em breve*, sem oferecer reserva para esse ano.
- Links antigos para `normal.html` ou `cesarea.html` continuam funcionando por meio de um redirecionamento para `parto.html`.
- As animações respeitam a preferência de movimento reduzido e os efeitos de toque têm alternativa para telas móveis.
- Antes de colocar no ar, vale conferir pessoalmente todas as regras contratuais e descrições de serviços da cliente.
