# RIGHUB — Documento Mestre de Produto, Arquitetura e Execução
## Versão completa do projeto (MVP + Pós-MVP + Escala)

---

# 1) Visão Geral

## 1.1 Nome do produto

**RIGHUB**

## 1.2 Definição do produto

RIGHUB é uma plataforma SaaS para a comunidade 4WD, trailers e vans, combinando:

- comunidade nichada;
- garagem digital;
- ferramentas técnicas para setup elétrico/off-grid;
- catálogo colaborativo de acessórios;
- relatórios compartilháveis;
- monetização por assinatura Free + Pro.

O produto não será apenas uma rede social e não será apenas uma calculadora.  
Ele será um ecossistema híbrido com:

- valor comunitário;
- valor técnico;
- valor prático para planejamento, validação e evolução de setups.

## 1.3 Problema que o produto resolve

Hoje, usuários de 4WD, trailers e vans enfrentam problemas recorrentes:

- informação técnica espalhada e inconsistente;
- dificuldade para dimensionar sistemas 12V/24V com segurança;
- fóruns genéricos com pouco contexto e pouca curadoria;
- comparações ruins entre produtos e setups;
- falta de uma forma simples de salvar, compartilhar e evoluir setups reais.

## 1.4 Proposta de valor

RIGHUB entrega três pilares centrais:

### Comunidade
Um espaço focado em 4WD, overlanding, camping, trailers e vans.

### Garagem digital
Um local para o usuário cadastrar veículo, mods, acessórios, mídia e histórico do setup.

### Ferramentas técnicas
Calculadoras e validadores para consumo, solar, DCDC, autonomia, cabos, fusíveis e coerência do sistema.

## 1.5 Público-alvo

### Público principal
- donos de 4WD;
- usuários de trailers;
- usuários de vans camper;
- iniciantes montando sistema elétrico;
- entusiastas avançados que gostam de comparar setups.

### Público secundário
- instaladores;
- lojas especializadas;
- criadores de conteúdo nichado;
- moderadores/comunidade técnica;
- marcas que queiram presença futura no ecossistema.

---

# 2) Objetivos do Produto

## 2.1 Objetivo principal

Construir uma plataforma de referência para a comunidade 4WD com foco em comunidade e inteligência de setup elétrico.

## 2.2 Objetivos secundários

- formar uma base ativa de comunidade nichada;
- criar ferramentas técnicas realmente úteis e confiáveis;
- converter parte dos usuários Free para Pro;
- se tornar uma referência para pesquisa de setups e produtos;
- permitir que o produto cresça por módulos sem reescrita estrutural.

## 2.3 Objetivos de negócio

- validar produto com baixo custo inicial;
- construir recorrência de uso;
- alcançar receita recorrente via assinatura Pro;
- abrir espaço para futuras linhas de receita:
  - afiliados;
  - marketplace;
  - sponsored listings;
  - conteúdo premium;
  - relatórios avançados;
  - espaço para fabricantes e instaladores.

---

# 3) Princípios de Construção

## 3.1 Princípios gerais

- feature-first;
- escopo fechado por etapa;
- modularidade por domínio;
- priorização pragmática;
- simplicidade estrutural no início;
- crescimento sem retrabalho estrutural;
- decisões registradas;
- fórmulas auditáveis;
- produto orientado a dados e confiabilidade.

## 3.2 Regras de execução

- uma feature por vez;
- sem abrir múltiplas frentes sem fechamento;
- nenhuma fórmula entra em produção sem regra explícita;
- nenhum recurso Pro deve depender de improviso;
- todo módulo deve ter contratos claros;
- toda diferença Free vs Pro deve ser objetiva.

## 3.3 Filosofia técnica

O projeto será construído como **monólito modular** no início.

Motivos:

- menor complexidade operacional;
- maior velocidade de entrega;
- melhor compatibilidade com uso de IA na implementação;
- facilidade para testes e refatoração;
- custo menor no estágio inicial;
- possibilidade de separar módulos depois, se necessário.

---

# 4) Escopo Macro do Produto

## 4.1 Domínios principais

- core platform;
- identidade, conta e assinaturas;
- comunidade social;
- fórum;
- garagem;
- ferramentas de energia;
- catálogo de acessórios;
- relatórios;
- moderação;
- analytics;
- billing;
- administração.

## 4.2 Grande visão funcional

O usuário poderá:

- criar conta;
- montar perfil;
- cadastrar veículos;
- cadastrar mods;
- criar sua garagem;
- postar mídia e conteúdo;
- interagir no feed;
- participar do fórum;
- rodar calculadoras técnicas;
- comparar cenários;
- salvar setups;
- gerar relatórios compartilháveis;
- usar catálogo de produtos;
- receber insights;
- evoluir setup ao longo do tempo.

---

# 5) Estratégia de Produto

## 5.1 Estratégia de entrada no mercado

A entrada será feita por dois ganchos complementares:

### Gancho 1 — comunidade
Atrair usuários pelo valor social e pela identificação de nicho.

### Gancho 2 — ferramentas
Atrair usuários pelo valor prático das calculadoras e validadores.

## 5.2 Estratégia de retenção

Reter usuários por:

- garagem salva;
- histórico de cálculos;
- comparação entre setups;
- utilidade recorrente;
- comunidade;
- relatórios compartilháveis;
- progresso técnico do setup.

## 5.3 Estratégia de monetização

A monetização será baseada em assinatura Pro.

A regra central é:

**o plano Free não terá limite de quantidade de uso das ferramentas.**

A diferença entre Free e Pro será:

- profundidade;
- enriquecimento;
- precisão;
- catálogo real;
- comparações;
- insights;
- relatórios avançados;
- conveniência.

---

# 6) Segmentação de Planos

## 6.1 Plano Free

Inclui:

- cadastro e perfil;
- garagem básica;
- feed e fórum;
- criação de posts e tópicos;
- calculadoras em modo manual/generico;
- uso ilimitado das ferramentas básicas;
- salvamento básico de setups/cálculos;
- relatórios básicos;
- contribuição ao catálogo via submissão;
- visualização pública limitada do ecossistema.

## 6.2 Plano Pro

Inclui tudo do Free, mais:

- uso de produtos reais nas ferramentas;
- catálogo avançado;
- comparações entre cenários;
- relatórios avançados;
- insights técnicos;
- histórico expandido;
- comparação entre setups;
- rating detalhado;
- módulos avançados de validação;
- melhores filtros e organização;
- funções futuras premium.

## 6.3 Futuro plano Pro Plus / Business (opcional futuro)

Possíveis recursos:

- múltiplos perfis de instalação;
- biblioteca técnica expandida;
- exportações avançadas;
- relatórios white-label;
- perfis profissionais;
- contas para instaladores/lojas;
- lead tools;
- analytics avançado.

---

# 7) Personas

## 7.1 Persona 1 — Iniciante do 4WD

Características:
- está montando primeiro setup;
- não domina elétrica;
- quer respostas simples;
- teme errar e gastar mal.

Necessidades:
- explicações claras;
- calculadoras simples;
- linguagem amigável;
- comparação fácil.

## 7.2 Persona 2 — Entusiasta avançado

Características:
- já tem experiência;
- quer mais precisão;
- gosta de comparar specs;
- gosta de comunidade técnica.

Necessidades:
- catálogo técnico;
- validações detalhadas;
- rating auditável;
- comparações entre produtos e setups.

## 7.3 Persona 3 — Criador de conteúdo / usuário social

Características:
- gosta de mostrar build;
- compartilha viagens;
- quer engajamento.

Necessidades:
- feed visual;
- garagem bonita;
- relatórios e setups compartilháveis;
- autoridade no nicho.

## 7.4 Persona 4 — Instalador / profissional

Características:
- entende mais do tema;
- quer usar a plataforma como apoio;
- pode virar evangelizador do produto.

Necessidades:
- ferramentas confiáveis;
- comparações;
- relatórios;
- histórico;
- apresentação clara para cliente.

---

# 8) Jornada do Usuário

## 8.1 Primeira jornada

1. Descobre o produto.
2. Cria conta.
3. Completa perfil.
4. Cria garagem.
5. Cadastra primeiro veículo.
6. Faz primeiro cálculo de carga.
7. Salva setup.
8. Explora feed/fórum.
9. Compartilha ou interage.
10. Recebe incentivo para Pro.

## 8.2 Jornada recorrente

1. Volta para revisar setup.
2. Ajusta carga/solar/DCDC.
3. Compara cenário.
4. Publica evolução no feed.
5. Busca ajuda técnica no fórum.
6. Atualiza mods e catálogo.

## 8.3 Jornada de conversão

1. Usuário Free percebe limite de profundidade.
2. Enxerga valor no catálogo real e nos insights.
3. Testa comparação.
4. Vê valor em relatório/rating/precisão.
5. Assina Pro.

---

# 9) Arquitetura de Produto por Módulo

## 9.1 Core Platform

Responsável por:

- autenticação;
- conta;
- perfil;
- assinatura;
- permissões;
- recursos transversais.

## 9.2 Garage

Responsável por:

- garagem do usuário;
- veículos;
- mods;
- acessórios;
- fotos;
- vídeos;
- agrupamento por setup.

## 9.3 Community Social

Responsável por:

- posts;
- comentários;
- reações;
- feed;
- denúncias;
- moderação social.

## 9.4 Community Forum

Responsável por:

- categorias;
- tópicos;
- respostas;
- tags;
- moderação de fórum.

## 9.5 Tools Energy

Responsável por:

- carga diária;
- solar;
- DCDC;
- validação global;
- rating;
- autonomia futura;
- cabos/fusíveis futuros.

## 9.6 Catalog

Responsável por:

- categorias de acessórios;
- campos específicos por categoria;
- produtos reais;
- specs;
- submissões da comunidade;
- aprovação e auditoria.

## 9.7 Reporting

Responsável por:

- relatórios compartilháveis;
- snapshots de setups;
- visualização pública;
- comparativos.

## 9.8 Billing

Responsável por:

- planos;
- cobrança;
- estado da assinatura;
- autorização por feature.

## 9.9 Moderation

Responsável por:

- denúncias;
- ações administrativas;
- logs;
- suspensões;
- bloqueios;
- aprovação de submissions.

## 9.10 Admin

Responsável por:

- gestão do catálogo;
- gestão de usuários;
- gestão de moderação;
- gestão de configurações;
- observabilidade interna.

---

# 10) Stack Recomendada do Projeto Completo

## 10.1 Diretriz

A stack precisa equilibrar:

- velocidade;
- modularidade;
- tipagem forte;
- custo controlado;
- deploy simples;
- escalabilidade suficiente;
- facilidade para IA contribuir;
- boa base para crescimento.

## 10.2 Stack escolhida

### Frontend
- Next.js
- TypeScript
- App Router
- React Server Components quando fizer sentido

### UI
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js como aplicação full-stack no início
- camada de domínio modular interna
- services/use-cases/repositories por módulo

### Banco de dados
- PostgreSQL

### ORM
- Drizzle ORM

### Autenticação
- Auth.js

### Billing
- Stripe

### Storage de mídia
- Cloudflare R2 ou S3-compatible

### Analytics de produto
- PostHog

### Background jobs
- Trigger.dev / Inngest / cron + job layer simples

### Logs e erros
- Sentry

### Deploy
- Vercel para app
- Neon / Supabase Postgres / AWS RDS para banco
- R2/S3 para storage

## 10.3 Arquitetura alvo

**Monólito modular**

## 10.4 O que não usar no início

- microservices;
- múltiplos bancos sem necessidade;
- fila distribuída pesada;
- elastic search cedo demais;
- backend separado sem necessidade comprovada;
- event bus complexo no MVP.

## 10.5 Quando evoluir a stack

Separação futura só deve acontecer se houver:

- tráfego alto e segmentado;
- gargalo real em módulo específico;
- necessidade de times independentes;
- API pública forte;
- busca complexa real;
- workloads técnicos muito pesados.

---

# 11) Estrutura Técnica do Projeto

## 11.1 Estrutura por domínios

- `core-platform`
- `garage`
- `community-social`
- `community-forum`
- `tools-energy`
- `catalog`
- `reporting`
- `billing`
- `moderation`
- `admin`
- `shared`

## 11.2 Regras de dependência

- `billing` autoriza acesso, mas não contém regra de negócio de ferramenta;
- `tools-energy` pode ler `catalog`;
- `catalog` não depende de `tools-energy`;
- `community-social` e `community-forum` não dependem de `tools-energy`;
- `reporting` agrega dados;
- `moderation` atua transversalmente;
- `shared` só contém utilidades genéricas.

## 11.3 Camadas por módulo

Cada módulo deve ter:

- entidades;
- value objects quando necessário;
- casos de uso;
- contratos;
- repositórios;
- queries;
- mapeadores;
- validações;
- testes.

---

# 12) Modelo de Dados — Entidades Principais

## 12.1 Núcleo

- User
- Profile
- Subscription
- Role
- Permission
- Session
- AuditLog

## 12.2 Garagem

- Garage
- Vehicle
- VehicleMod
- VehicleAccessory
- VehicleMedia
- Setup
- SetupSnapshot

## 12.3 Social

- Post
- PostMedia
- Comment
- Reaction
- Follow
- ContentReport

## 12.4 Fórum

- ForumCategory
- ForumTag
- ForumTopic
- ForumReply
- ForumReport

## 12.5 Ferramentas

- CalculationLoadRun
- CalculationLoadItem
- SolarRun
- SolarScenario
- DCDCRun
- DCDCScenario
- ValidationRun
- SetupRating
- FormulaVersion

## 12.6 Catálogo

- AccessoryCategory
- CategorySpecField
- AccessoryProduct
- AccessoryProductSpecValue
- AccessorySubmission
- AccessoryModerationLog

## 12.7 Relatórios

- ShareReport
- ShareReportSnapshot
- ShareReportView

## 12.8 Moderação

- ModerationAction
- ModerationReason
- Suspension
- BanRecord
- ReviewQueueItem

## 12.9 Analytics interno

- EventTrack
- ConversionEvent
- FeatureUsageEvent

---

# 13) Convenções de Persistência

## 13.1 Campos comuns

Toda entidade aplicável deve ter:

- `id`
- `created_at`
- `updated_at`
- `created_by` quando fizer sentido
- `deleted_at` para soft delete quando aplicável

## 13.2 Soft delete

Usar soft delete em:

- posts;
- comentários;
- tópicos;
- respostas;
- submissions;
- itens moderáveis.

## 13.3 Auditoria

Registrar auditoria em:

- ações de moderação;
- aprovações de catálogo;
- alterações críticas em fórmulas;
- mudanças de plano;
- alterações em status de publicação.

## 13.4 Versionamento de cálculo

Toda fórmula relevante deve ter:

- nome;
- versão;
- data de ativação;
- status;
- descrição da mudança;
- impacto esperado.

---

# 14) Módulo Core — Requisitos

## 14.1 Escopo

- cadastro e login;
- onboarding;
- perfil;
- papéis;
- assinatura;
- controle de acesso.

## 14.2 Regras

- email único;
- username único opcional ou obrigatório conforme decisão futura;
- assinatura determina disponibilidade de recursos;
- autorização por feature deve ser centralizada;
- usuário banido não acessa recursos ativos da comunidade.

## 14.3 Critérios de aceite

- criar conta;
- autenticar;
- completar perfil;
- ler estado de assinatura;
- aplicar restrição Free vs Pro.

---

# 15) Módulo Garage — Requisitos

## 15.1 Objetivo

Permitir que o usuário represente digitalmente seu veículo e seu setup.

## 15.2 Escopo

- criar garagem;
- adicionar veículos;
- cadastrar mods;
- adicionar mídia;
- agrupar setup;
- salvar contexto técnico do build.

## 15.3 Recursos V1

- nome do veículo;
- marca;
- modelo;
- ano;
- descrição;
- fotos;
- vídeos do YouTube;
- lista de mods;
- categorização básica.

## 15.4 Evolução futura

- múltiplos setups por veículo;
- timeline de evolução do build;
- componentes ligados ao catálogo;
- integração com relatórios;
- setup principal destacado.

---

# 16) Módulo Feed — Requisitos

## 16.1 Objetivo

Criar um feed de comunidade simples, útil e escalável.

## 16.2 Escopo inicial

- criar post;
- texto;
- fotos;
- comentários;
- curtidas/reações;
- feed cronológico.

## 16.3 Evolução futura

- feeds filtrados;
- destaque por relevância;
- salvar posts;
- repost;
- menções;
- hashtags/tags;
- ranking de conteúdo;
- conteúdo técnico vinculado a setup.

---

# 17) Módulo Fórum — Requisitos

## 17.1 Objetivo

Ter discussões mais duráveis e organizadas que o feed.

## 17.2 Taxonomia inicial

- Planejamento de viagem
- Setups e builds
- Elétrica e energia
- Recuperação e segurança
- Acampamento e vida no trail
- Mecânica e manutenção
- Equipamentos e reviews
- Novatos no 4WD

## 17.3 Tags iniciais

- iniciante
- intermediario
- avancado
- 12v
- 24v
- solar
- dcdc
- trip-report
- duvida
- review
- tutorial
- urgente

## 17.4 Regras básicas

- tópicos técnicos precisam de contexto;
- reviews precisam declarar uso;
- tópicos urgentes devem ter checklist mínimo;
- spam não é permitido.

---

# 18) Módulo de Ferramentas — Visão Geral

## 18.1 Objetivo

Oferecer um conjunto progressivo de ferramentas técnicas úteis, claras e auditáveis.

## 18.2 Ordem de construção

1. carga diária;
2. solar;
3. DCDC;
4. validação + rating;
5. relatório compartilhável;
6. autonomia futura;
7. cabos;
8. fusíveis;
9. queda de tensão;
10. expansão futura.

## 18.3 Regra central

Toda ferramenta deve ter:

- objetivo;
- escopo;
- fora de escopo;
- entradas;
- validações;
- fórmulas;
- saída;
- diferença Free vs Pro;
- user stories;
- critérios de aceite.

---

# 19) Ferramenta: Calculadora de Carga Diária

## 19.1 Objetivo

Permitir que o usuário estime consumo diário em Ah e Wh.

## 19.2 Escopo

- itens manuais;
- entrada em W ou A;
- horas por dia;
- quantidade;
- 12V ou 24V;
- ciclo de uso opcional;
- salvar cálculo.

## 19.3 Fórmulas

### Se informar W
- `A = W / V`

### Consumo por item
- `Ah_item = A * horas_dia * quantidade * (ciclo_percentual / 100)`

### Em Wh
- `Wh_item = V * Ah_item`

### Totais
- `Ah_total = soma(Ah_item)`
- `Wh_total = soma(Wh_item)`

## 19.4 Validações

- horas: 0 a 24;
- potência/corrente/quantidade > 0;
- ciclo: 1 a 100;
- mínimo de 1 item válido.

## 19.5 Free

- manual/generico;
- uso ilimitado;
- total Ah/dia;
- total Wh/dia;
- tabela por item;
- alerta básico.

## 19.6 Pro

- produtos reais;
- comparações;
- top itens que mais consomem;
- insights;
- faixa recomendada de capacidade útil diária.

---

# 20) Ferramenta: Calculadora Solar

## 20.1 Objetivo

Estimar geração diária e comparar com consumo.

## 20.2 Escopo

- painel manual ou real;
- horas de sol pico;
- perdas;
- cálculo em Ah/Wh;
- saldo energético.

## 20.3 Fórmulas

- `Wp_total = Wp_painel * quantidade`
- `eficiencia = 1 - (perdas_percentual / 100)`
- `Wh_gerado = Wp_total * HSP * eficiencia`
- `Ah_gerado = Wh_gerado / V_sistema`
- `saldo_Wh = Wh_gerado - Wh_consumo`
- `saldo_Ah = Ah_gerado - Ah_consumo`

## 20.4 Classificação

- superávit;
- equilíbrio;
- déficit.

## 20.5 Free

- entrada manual;
- uso ilimitado;
- classificação simples;
- recomendação básica.

## 20.6 Pro

- catálogo real;
- comparação de cenários;
- margem de segurança;
- sugestão de faixa útil de bateria.

---

# 21) Ferramenta: Calculadora de DCDC

## 21.1 Objetivo

Sugerir faixa adequada de carregador DCDC.

## 21.2 Fórmulas

- `Ah_alvo = Ah_consumo_dia * (meta_recuperacao_percentual / 100)`
- `I_necessaria = Ah_alvo / horas_conducao`
- `I_ajustada = I_necessaria / eficiencia_carga`
- `I_final = I_ajustada * (1 + margem_seguranca_percentual / 100)`

## 21.3 Faixas comerciais

Arredondar para cima para:

- 20A
- 30A
- 40A
- 50A
- 60A

## 21.4 Free

- entrada manual;
- validação de faixa;
- status de adequação.

## 21.5 Pro

- modelos reais;
- comparação;
- insight de folga;
- alertas melhores.

---

# 22) Ferramenta: Validação Completa do Sistema

## 22.1 Objetivo

Consolidar consumo, solar e DCDC em diagnóstico único.

## 22.2 Modelo de rating aprovado

**20 checks x 0.5 ponto = nota final de 0 a 10**

## 22.3 Estrutura do rating

Cada check tem:

- regra;
- resultado;
- justificativa;
- peso;
- origem dos dados.

## 22.4 Versão inicial dos checks

Os 20 checks deverão cobrir pelo menos:

- cobertura solar;
- coerência do DCDC;
- margem energética;
- autonomia mínima;
- coerência das perdas;
- consistência dos dados;
- itens críticos sem spec;
- recuperação diária;
- coerência entre dados manuais e catálogo;
- completude mínima;
- e demais checks definidos em documento técnico próprio.

## 22.5 Interpretação

- 0 a 3: alto risco operacional
- 4 a 6: funcional com restrições
- 7 a 8: bom setup
- 9 a 10: setup muito bem dimensionado

## 22.6 Free

- nota;
- checks resumidos;
- top 3 melhorias.

## 22.7 Pro

- justificativa completa;
- simulação de impacto;
- comparação entre setups.

---

# 23) Ferramentas Futuras

## 23.1 Autonomia de bateria
Simular autonomia por consumo e capacidade útil.

## 23.2 Bitola de cabos
Sugerir seção de cabo com base em corrente, distância e queda de tensão.

## 23.3 Fusíveis
Sugerir faixa e posicionamento básico de fusíveis.

## 23.4 Queda de tensão
Calcular perda por trecho e alertar para risco.

## 23.5 Planejador de setup
Montar cenário completo de sistema.

## 23.6 Biblioteca técnica
Glossário, guias, explicações práticas e boas práticas.

---

# 24) Catálogo de Acessórios

## 24.1 Objetivo

Criar base reutilizável de produtos reais para alimentar as ferramentas Pro.

## 24.2 Funções do catálogo

- guardar produtos;
- guardar specs;
- padronizar categorias;
- evitar duplicidade;
- permitir uso nas calculadoras;
- permitir contribuição da comunidade.

## 24.3 Categorias iniciais

- refrigeração;
- iluminação;
- bombas;
- comunicação;
- carga USB e inversores;
- acessórios de camp;
- solar;
- DCDC;
- baterias;
- controladores;
- aquecimento auxiliar;
- roteadores/starlink.

## 24.4 Regras de qualidade

- campos obrigatórios preenchidos;
- unidade consistente;
- sem duplicidade exata;
- trilha de auditoria;
- produto só publicado após aprovação.

## 24.5 Fluxo comunitário

1. usuário sugere produto;
2. sistema valida;
3. item vai para pendente;
4. moderador aprova/rejeita/solicita ajuste;
5. ação fica em log.

---

# 25) Relatório Compartilhável

## 25.1 Objetivo

Permitir geração e compartilhamento de resumo técnico do setup.

## 25.2 Conteúdo mínimo

- perfil resumido;
- veículo principal;
- consumo diário;
- solar;
- DCDC;
- rating;
- checks;
- top melhorias.

## 25.3 Níveis de privacidade

- público;
- não listado;
- privado.

## 25.4 Free

- relatório básico;
- link único;
- visão resumida.

## 25.5 Pro

- detalhes técnicos;
- comparativos;
- histórico;
- evolução por data.

---

# 26) Moderação e Segurança Comunitária

## 26.1 Objetivo

Garantir ambiente confiável e seguro.

## 26.2 Recursos mínimos

- denúncia;
- fila de moderação;
- warning;
- suspensão;
- banimento;
- trilha de auditoria.

## 26.3 Escopo de moderação

- posts;
- comentários;
- tópicos;
- respostas;
- submissions do catálogo;
- perfis.

## 26.4 Escalonamento

1. orientação;
2. remoção + aviso;
3. suspensão;
4. banimento.

---

# 27) Admin e Backoffice

## 27.1 Necessidades do admin

- aprovar catálogo;
- revisar denúncias;
- gerenciar usuários;
- gerenciar fórmulas;
- ajustar categorias;
- visualizar uso do produto;
- ver métricas;
- gerir planos e acessos.

## 27.2 Telas mínimas de admin

- dashboard;
- fila de moderação;
- gestão de catálogo;
- gestão de usuários;
- gestão de fórum;
- gestão de fórmulas;
- logs;
- settings.

---

# 28) Analytics e KPIs

## 28.1 KPIs de ativação

- cadastro -> perfil completo;
- perfil completo -> garagem criada;
- garagem criada -> primeiro post/tópico;
- garagem criada -> primeiro cálculo.

## 28.2 KPIs de engajamento

- DAU;
- WAU;
- retenção D7;
- retenção D30;
- posts por usuário ativo;
- respostas por tópico;
- setups salvos por usuário.

## 28.3 KPIs das ferramentas

- cálculos por usuário ativo;
- taxa de conclusão;
- uso cruzado entre ferramentas;
- uso do catálogo;
- relatórios gerados.

## 28.4 KPIs de monetização

- conversão Free -> Pro;
- MRR;
- churn;
- taxa de trial para assinatura;
- uso dos recursos Pro.

---

# 29) SEO, Conteúdo e Crescimento

## 29.1 Estratégia de crescimento orgânico

- páginas públicas indexáveis;
- relatórios compartilháveis com SEO controlado;
- conteúdo técnico futuro;
- páginas de categoria;
- páginas de guia;
- conteúdo de fórum indexável com cuidado.

## 29.2 Conteúdo futuro

- blog técnico;
- guias de setup;
- conteúdo educativo;
- explicações das calculadoras;
- comparativos de produtos;
- biblioteca de boas práticas.

---

# 30) Segurança, Privacidade e Confiabilidade

## 30.1 Segurança básica obrigatória

- auth segura;
- proteção de rotas;
- RBAC;
- validação server-side;
- rate limit;
- logs de ação sensível;
- proteção de upload;
- sanitização de conteúdo.

## 30.2 Privacidade

- controle de visibilidade da garagem;
- controle de visibilidade dos relatórios;
- opção de perfil privado;
- consentimento para dados públicos.

## 30.3 Confiabilidade técnica

- tratamento de erro;
- fallback em jobs;
- observabilidade;
- versionamento de fórmula;
- consistência de cálculo.

---

# 31) Estratégia de Releases

## 31.1 Release A — Comunidade base

- auth;
- perfil;
- garagem;
- feed;
- fórum;
- moderação mínima.

## 31.2 Release B — Ferramenta base

- carga diária;
- salvamento;
- diferença Free vs Pro inicial.

## 31.3 Release C — Inteligência energética

- catálogo;
- solar;
- DCDC.

## 31.4 Release D — Diagnóstico

- validação completa;
- rating;
- relatórios.

## 31.5 Release E — Profundidade técnica

- autonomia;
- cabos;
- fusíveis;
- refinamentos.

## 31.6 Release F — Escala de produto

- SEO forte;
- conteúdos;
- recursos profissionais;
- otimizações;
- busca avançada;
- expansão de monetização.

---

# 32) Ordem Recomendada de Sprints

## Sprint 0 — Fundação
- stack final;
- repo;
- design system;
- banco inicial;
- auth;
- billing base;
- estrutura modular;
- admin mínimo.

## Sprint 1 — Core + Garage
- perfil;
- garagem;
- veículo;
- mídia;
- setup básico.

## Sprint 2 — Social
- feed;
- comentários;
- reações;
- fórum;
- tags;
- moderação mínima.

## Sprint 3 — Carga diária
- calculadora;
- salvamento;
- resultado Free vs Pro.

## Sprint 4 — Catálogo
- categorias;
- specs;
- submissions;
- moderação.

## Sprint 5 — Solar
- cálculo manual;
- cálculo com catálogo;
- saldo energético.

## Sprint 6 — DCDC
- cálculo;
- faixas;
- comparação.

## Sprint 7 — Rating
- validação;
- checks;
- nota;
- melhorias.

## Sprint 8 — Relatórios
- links compartilháveis;
- snapshots;
- privacidade.

## Sprint 9 — Refinos
- onboarding;
- conversão;
- analytics;
- qualidade.

---

# 33) Processo Operacional por Feature

Para toda feature:

1. definir objetivo em 1 frase;
2. definir escopo;
3. definir fora de escopo;
4. definir dados;
5. definir fluxo;
6. definir validações;
7. definir critérios de aceite;
8. implementar;
9. testar;
10. atualizar documento mestre.

---

# 34) Agentes de IA — Papéis

## 34.1 Agente de Produto
- quebra escopo;
- define requisitos;
- define critérios de aceite;
- mantém backlog.

## 34.2 Agente de Arquitetura
- define módulos;
- contratos;
- modelo de dados;
- decisões estruturais.

## 34.3 Agente de Implementação
- implementa escopo aprovado;
- não cria escopo novo;
- entrega código e testes mínimos.

## 34.4 Agente de QA
- valida fluxo;
- regressão;
- bugs;
- status de pronto.

## 34.5 Agente de Dados/Calculadoras
- define variáveis;
- define fórmulas;
- cenários de teste;
- versionamento.

## 34.6 Agente de Conteúdo/Comunidade
- taxonomia;
- regras;
- seed inicial;
- onboarding comunitário.

---

# 35) Definition of Ready (DoR)

Uma feature só inicia quando tiver:

- objetivo;
- escopo;
- fora de escopo;
- entradas;
- saídas;
- validações;
- critérios de aceite.

---

# 36) Definition of Done (DoD)

Uma feature só termina quando:

- critérios de aceite aprovados;
- testes mínimos verdes;
- regressão crítica validada;
- Free vs Pro aplicado;
- documento mestre atualizado;
- logs e auditoria aplicados quando necessário.

---

# 37) Riscos Principais

## 37.1 Escopo inchado cedo demais
Mitigação:
- manter releases fechados;
- backlog ordenado;
- sem antecipar pós-MVP sem razão.

## 37.2 Ferramentas sem confiabilidade
Mitigação:
- fórmulas explícitas;
- testes de cenários;
- versionamento;
- auditoria.

## 37.3 Comunidade fraca
Mitigação:
- onboarding;
- seed inicial;
- taxonomia clara;
- relatórios compartilháveis;
- integração entre social e tools.

## 37.4 Stack pesada cedo
Mitigação:
- monólito modular;
- infra simples;
- separar só quando houver dado real.

## 37.5 Conversão baixa para Pro
Mitigação:
- Free útil;
- Pro claramente melhor;
- diferenciação por profundidade e conveniência;
- melhor comunicação de valor.

---

# 38) Decisões Fechadas

- nome do produto: **RIGHUB**
- arquitetura inicial: **monólito modular**
- modelo de monetização: **Free + Pro**
- uso das calculadoras no Free: **ilimitado**
- modelo de rating final aprovado: **20 checks x 0.5**
- foco do produto: **4WD + trailers + vans**
- ordem de valor: **comunidade + ferramentas**

---

# 39) Gates de Decisão Futura

## 39.1 Gates que ainda podem surgir

- app mobile nativo ou não;
- busca avançada dedicada;
- modo profissional/business;
- marketplace;
- afiliados;
- API pública;
- multilíngue;
- engine de recomendação avançada.

---

# 40) Memória de Decisões

Usar sempre o template:

- Data:
- Área:
- Feature:
- Decisão:
- Motivo:
- Alternativas descartadas:
- Impacto no Free:
- Impacto no Pro:
- Impacto técnico:
- Risco:
- Próxima ação:

---

# 41) Checklist de Go / No-Go para Implementação

Para começar a execução real, o projeto precisa ter confirmado:

- stack final;
- estrutura modular;
- auth;
- billing base;
- design system;
- banco inicial;
- entidades MVP;
- regras Free vs Pro;
- Sprint 0 fechada;
- Sprint 1 priorizada.

---

# 42) Resumo Executivo Final

RIGHUB será uma plataforma SaaS nichada para 4WD, trailers e vans, construída sobre dois pilares:

1. comunidade;
2. inteligência de setup elétrico.

O produto será lançado de forma pragmática, começando com:

- core de comunidade;
- garagem;
- calculadora de carga diária.

Depois evoluirá para:

- catálogo real;
- solar;
- DCDC;
- rating;
- relatórios;
- ferramentas técnicas avançadas.

A arquitetura escolhida será um monólito modular com stack moderna, simples e escalável no estágio atual:

- Next.js
- TypeScript
- PostgreSQL
- Drizzle
- Auth.js
- Stripe
- Tailwind
- shadcn/ui
- R2/S3
- PostHog
- Sentry

A estratégia de monetização será Free + Pro, com a regra central de que o plano Free mantém uso ilimitado das ferramentas básicas, enquanto o Pro entrega profundidade, catálogo real, comparações, insights e relatórios avançados.

Este documento passa a ser a referência central do produto, arquitetura, backlog e execução.

---