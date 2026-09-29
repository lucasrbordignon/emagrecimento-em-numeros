# Se a página estiver carregando em branco no GitHub Pages

O GitHub Pages serve **arquivos estáticos compilados (HTML/CSS/JS)**. Ele **NÃO** roda `npm run dev` nem interpreta arquivos `.tsx` diretamente da raiz.

Existem apenas **2 maneiras** de colocar no ar:

---

### Opção 1: Via GitHub Actions (Recomendada e Automática)

Nós já criamos o arquivo `.github/workflows/deploy.yml` no seu repositório. Ele compila o projeto sozinho no servidor do GitHub!

Para ativar:
1. Abra seu repositório no GitHub.
2. Vá em **Settings** (Configurações) > **Pages** (no menu esquerdo).
3. Onde diz **"Source"** (Fonte):
   - Mude de **"Deploy from a branch"** para **"GitHub Actions"**.
4. Vá na aba **Actions** no topo do GitHub. Se já tiver um workflow pendente ou concluído, clique nele. O GitHub irá publicar e te dar o link oficial.

---

### Opção 2: Subir os arquivos compilados da pasta `dist/`

Se você estiver usando a opção clássica **"Deploy from a branch" (main / root)**:

O GitHub Pages tenta ler o `index.html` da raiz, mas ele aponta para `/src/main.tsx` (que o navegador não entende sem compilar).

Para funcionar sem GitHub Actions:
1. No seu computador, rode no terminal:
   ```bash
   npm run build
   ```
2. Isso cria a pasta `dist/`.
3. Copie o conteúdo de **DENTRO** da pasta `dist/` (`index.html`, pasta `assets/`, etc.) e coloque na raiz da branch que você configurou no GitHub Pages (ou suba para a branch `gh-pages`).
