<script>
    import '../app.css'
    import MarkdownIt from "markdown-it"
    import markdown from "../Markdown/Markdown.md?raw"
    
    const md = new MarkdownIt()
  </script>
  
  {@html md.render(markdown)}