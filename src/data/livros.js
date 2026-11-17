const bookSeed = [
  ['Mindset', [['Mindset', 'Carol Dweck', 5, '9788547000240'], ['O poder do agora', 'Eckhart Tolle', 5, '9788575420273'], ['Os 7 hábitos das pessoas altamente eficazes', 'Stephen Covey', 5, '9788543105871'], ['A coragem de ser imperfeito', 'Brené Brown', 4, '9788543104300'], ['Mais esperto que o diabo', 'Napoleon Hill', 4, '9788568014000'], ['O jeito Harvard de ser feliz', 'Shawn Achor', 4, '0553415067'], ['Rápido e devagar', 'Daniel Kahneman', 5, '9788539003839'], ['O homem em busca de sentido', 'Viktor Frankl', 5, '9788532532899'], ['A arte da felicidade', 'Dalai Lama', 4, '9788573029950'], ['Meditações', 'Marco Aurélio', 5, '9786559100576'], ['A montanha é você', 'Brianna Wiest', 4, '9786555603491'], ['O obstáculo é o caminho', 'Ryan Holiday', 4, '9788551004924'], ['Antifrágil', 'Nassim Taleb', 4, '9788576849333']]],
  ['Produtividade', [['Essencialismo', 'Greg McKeown', 5, '0804137382'], ['Trabalho focado', 'Cal Newport', 5, '9788551003422'], ['Hábitos atômicos', 'James Clear', 5, '9788550807564'], ['A única coisa', 'Gary Keller', 4, '9788543102382'], ['Getting Things Done', 'David Allen', 4, '9780349406784'], ['Comece pelo mais difícil', 'Brian Tracy', 4, '9788573126742'], ['A tríade do tempo', 'Christian Barbosa', 4, '9788573127152'], ['O poder do hábito', 'Charles Duhigg', 5, '081298160X'], ['Organize amanhã hoje', 'Jason Selk', 4, '9788573129184'], ['Deep Work', 'Cal Newport', 5, '9781455586691'], ['Checklist', 'Atul Gawande', 4, '9788539002047'], ['A arte de fazer acontecer', 'David Allen', 4, '9788575428026']]],
  ['Empreendedorismo', [['Comece pelo porquê', 'Simon Sinek', 5, '1591846447'], ['A startup enxuta', 'Eric Ries', 5, '9788543108629'], ['De zero a um', 'Peter Thiel', 4, '9788580577514'], ['O lado difícil das situações difíceis', 'Ben Horowitz', 4, '9788543102023'], ['A estratégia do oceano azul', 'W. Chan Kim', 4, '9788535215244'], ['Pai rico, pai pobre', 'Robert Kiyosaki', 4, '9788557173280'], ['A empresa do século XXI', 'Robert Kiyosaki', 4, '9788576843168'], ['Rework', 'Jason Fried', 4, '9780307463746'], ['O mito do empreendedor', 'Michael Gerber', 4, '9788535207485'], ['Criatividade S.A.', 'Ed Catmull', 5, '9788539604798'], ['StoryBrand', 'Donald Miller', 4, '9788543105464'], ['A loja de tudo', 'Brad Stone', 4, '9788543102207'], ['Sprint', 'Jake Knapp', 4, '9781501121746'], ['Marketing 4.0', 'Philip Kotler', 4, '9788543105334']]],
  ['Tecnologia e desenvolvimento', [['Código limpo', 'Robert C. Martin', 5, '9788576082675'], ['O programador pragmático', 'Andrew Hunt', 5, '9780135957059'], ['Refatoração', 'Martin Fowler', 5, '9780134757599'], ['Domain-Driven Design', 'Eric Evans', 4, '0321125215'], ['Entendendo algoritmos', 'Aditya Bhargava', 5, '9788575225634'], ['Estruturas de dados e algoritmos em Java', 'Michael Goodrich', 4, '9781118771334'], ['Design de interação', 'Jennifer Preece', 4, '9788536304947'], ['Não me faça pensar', 'Steve Krug', 5, '9788576088505'], ['O design do dia a dia', 'Don Norman', 5, '9788532520836'], ['Clean Architecture', 'Robert C. Martin', 4, '9780134494166'], ['Engenharia de software', 'Ian Sommerville', 4, '9788543024970'], ['Design Patterns', 'Erich Gamma', 5, '0201633612'], ['The Phoenix Project', 'Gene Kim', 5, '9781942788294'], ['The Mythical Man-Month', 'Frederick Brooks', 4, '9780201835953'], ['You Don’t Know JS', 'Kyle Simpson', 4, '9781491904244']]],
]


const localCovers = {
  "aartedafelicidade": "A arte da felicidade.png",
  "acoragemdeserimperfeito": "A coragem de ser imperfeito.png",
  "aempresadoseculoxxirobertkiyosaki": "A empresa do século XXI Robert Kiyosaki.png",
  "aestrategiadooceanoazul": "A estratégia do oceano azul.png",
  "alojadetudo": "A loja de tudo.png",
  "amontanhaevoce": "a-montanha-e-voce.png",
  "astartupenxuta": "A startup enxuta.png",
  "atriadedotempo": "A tríade do tempo.png",
  "aunicacoisa": "A única coisa.png",
  "antifragil": "Antifrágil.png",
  "checklist": "Checklist.png",
  "comecepelomaisdificil": "Comece pelo mais difícil.png",
  "criatividadesa": "Criatividade S.A..png",
  "dezeroaum": "De zero a um.png",
  "designdeinteracao": "Design de interação.png",
  "engenhariadesoftware": "Engenharia de software.png",
  "entendendoalgoritmos": "Entendendo algoritmos.png",
  "gettingthingsdone": "Getting Things Done.png",
  "habitosatomicos": "Hábitos atômicos.png",
  "maisespertoqueodiabo": "Mais esperto que o diabo.png",
  "marketing40": "Marketing 4.0.png",
  "meditacoes": "Meditações.png",
  "mindset": "Mindset.png",
  "odesigndodiaadia": "O design do dia a dia.png",
  "ohomemembuscadesentido": "O homem em busca de sentido.png",
  "ojeitoharvarddeserfeliz": "O jeito Harvard de ser feliz.png",
  "omitodoempreendedor": "O mito do empreendedor.png",
  "oobstaculoeocaminho": "o-obstaculo-e-o-caminho.png",
  "opoderdoagora": "O poder do agora.png",
  "organizeamanhahoje": "Organize amanhã hoje.png",
  "os7habitosdaspessoasaltamenteeficazes": "Os 7 hábitos das pessoas altamente eficazes.png",
  "os7habitos": "os-7-habitos.png",
  "pairicopaipobre": "Pai rico, pai pobre.png",
  "storybrand": "StoryBrand.png",
  "trabalhofocado": "trabalho focado.png",
  "youdontknowjs": "You Don’t Know JS.png",
  "aempresadoseculoxxi": "A empresa do século XXI Robert Kiyosaki.png",
  "deepwork": "trabalho focado.png",
  "aartedefazeracontecer": "Getting Things Done.png"
}

const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')
export const books = bookSeed.flatMap(([category, items]) => items.map(([title, author, rating, isbn]) => ({
  title, author, category, rating, isbn,
  cover: localCovers[normalize(title)] ? `/capas/${localCovers[normalize(title)]}` : `/covers/${isbn}.jpg`,
})))
