# Atualização do site — O Poder das Mãos (`opoderdasmaos`)

Esta pasta contém a **versão mais recente** dos arquivos do site, já na mesma
estrutura do repositório `tiagofreitas83/opoderdasmaos` (deploy via GitHub Pages).

## O que fazer (Claude Code)

1. Copie **todo o conteúdo desta pasta** por cima dos arquivos do repositório,
   mantendo a estrutura de pastas (`components/`, `admin/`, `uploads/`).
2. `git add -A && git commit -m "Atualiza site: fotos reais, planos, textos, contato"`
3. `git push`
4. O **GitHub Pages republica sozinho** em ~1 minuto.

> Observação: o site é HTML standalone (React + Babel no navegador). Não há build —
> os arquivos são servidos como estão. Basta commitar e fazer push.

## O que mudou nesta versão

- **Hero**: foto real do Tiago fazendo massagem nas costas (`uploads/massagem.jpg`).
- **Login do painel** (`components/admin-panels.jsx`): acesso restrito por **usuário + senha**,
  apenas o Tiago (recepcionista removida). A senha **não** fica em texto puro — guardamos
  apenas o **hash SHA-256** e comparamos no navegador.
  - ⚠ **Segurança:** como o site é estático (GitHub Pages, sem servidor), a verificação
    roda no navegador e **não é uma proteção forte** (pode ser contornada por quem entende
    de código). Para proteção real do painel, use autenticação no servidor/host
    (ex.: Cloudflare Access, Netlify Identity, ou um backend).
- **Agenda**: mantida **bloqueada aos domingos** e **fora do horário comercial**
  (09:00–18:30) no agendamento público.
- **Fotos reais** do Tiago e da clínica em `uploads/` (`massagem.jpg`, `tiago.jpg`,
  `pilates.jpg`, `fachada.jpg`).
- **Medicina Chinesa**: removido o widget interativo dos "5 elementos" e todas as
  menções a **fitoterapia**.
- **Planos** (`components/sec-plans.jsx`): avulsa R$ 150 · pacote 4 sessões R$ 560
  (R$ 140 cada) · mensal R$ 135/sessão. Cards de artigos com link + imagem.
- **Agendamento** (`components/sec-booking.jsx`): removidos os preços do passo de
  seleção de terapia.
- **Textos**: removida a expressão "N'O Poder…" do site inteiro; hífens de redação
  trocados por vírgula; selo do hero = "Acupunturista e massagista".
- **Contato** (`components/sec-foot.jsx`): foto da fachada; botão "Chamar no
  WhatsApp" com texto/ícone brancos; endereço real (Rua Dr. Sebastião Leão, 151,
  Azenha, Porto Alegre/RS).
- **WhatsApp** (`components/ui.jsx`): número `5551985792797` (51 98579-2797) —
  confirme se é o WhatsApp ativo do Tiago.

## Estrutura

```
index.html              # site público
painel.html             # painel interno da agenda (/painel.html)
styles.css, sections.css, admin.css
pdm-store.js            # store da agenda (localStorage) — site + painel
image-slot.js, tweaks-panel.jsx
components/             # seções do site + telas do painel (JSX/Babel)
admin/admin-views.jsx   # visões dia/semana/mês do painel
uploads/                # fotos reais (massagem, tiago, pilates, fachada)
```

> Os arquivos são **referências de design em HTML funcional** — neste caso, são
> também o próprio código do site publicado. Pode commitar diretamente.
