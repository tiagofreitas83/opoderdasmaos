# Atualização do site — O Poder das Mãos (`opoderdasmaos`)

Versão **somente site institucional + WhatsApp**. A **agenda online** e o
**painel da equipe** foram removidos por enquanto — todo contato/agendamento é
feito pelo **WhatsApp**.

## O que fazer (Claude Code)

1. Copie **todo o conteúdo desta pasta** por cima do repositório (mantendo
   `components/` e `uploads/`).
2. **Apague do repositório** os arquivos que não são mais usados:
   ```
   git rm painel.html admin.css pdm-store.js image-slot.js \
          components/sec-booking.jsx components/admin-app.jsx \
          components/admin-panels.jsx admin/admin-views.jsx
   ```
3. `git add -A && git commit -m "Site institucional WhatsApp-only: remove agenda e painel"`
4. `git push` → o **GitHub Pages republica** sozinho em ~1 min.

## O que mudou nesta versão

- **Agenda online removida** — todos os botões "Agendar" agora abrem o **WhatsApp**.
- **Painel da equipe removido** (link no rodapé e arquivos do painel).
- **Seção de Conteúdo/artigos removida.**
- **Planos**: avulsa **R$ 180** · pacote 4 sessões **R$ 600** (R$ 150 cada) ·
  mensal **R$ 140/sessão**.
- **Contato**: marcador do mapa com **link para o Google Maps**; Instagram
  removido por enquanto.
- **Fotos reais** (`uploads/`): hero com massagem, retrato do Tiago, sala de
  pilates, fachada.

## Estrutura

```
index.html              # site público (WhatsApp-only)
styles.css, sections.css
tweaks-panel.jsx        # painel de ajustes (paleta/tipografia/hero)
components/             # ui, sec-top, sec-therapies, sec-mtc, sec-about,
                        # sec-plans, sec-foot, app
uploads/                # massagem, tiago, pilates, fachada
```

> Conferir: o **WhatsApp** está no número `5551985792797` (51 98579-2797) —
> precisa ter conta ativa para o botão abrir a conversa.
