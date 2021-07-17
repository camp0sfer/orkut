import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/OrkutCommons';
import { RelationsBoxWrapper } from '../src/components/Relations';

// xidefod256@nhmty.com

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.gitUser}.png`} style={{ borderRadius: '8px' }}></img>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitUser}`}>
          @{propriedades.gitUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <RelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {
          propriedades.items.map((followers) => {
            return (
              <li key={followers.id}>
                <a href={followers.html_url}>
                  <img src={`https://github.com/${followers.login}.png`} />
                  <span>{followers.login}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </RelationsBoxWrapper>
  )
}

export default function Home() {
  const gitUser = 'camp0sFer';
  const amigos = [
    'fbianca',
    'juunegreiros',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  // 0- Pegar um array de dados do github
  React.useEffect(function() {
    fetch('https://api.github.com/users/camp0sfer/followers')
    .then(function (respServidor) {
      return respServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    });

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers : {
        'Authorization': '09414f8740f0de8f299ee5e1046240',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      },
      body : JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesDato);
    })
  }, [])

  // 1- Criar um box que vai ter um map, baseado nos itens do array do giy

  return (
    <>
      <AlurakutMenu githubUser={gitUser}></AlurakutMenu>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitUser={gitUser}></ProfileSidebar>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              
              //traz os dados do formulario
              const dadosDoForm = new FormData(e.target);
              
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: gitUser
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL da capa"
                  name="image"
                  aria-label="Coloque a URL da capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="relationsArea" style={{ gridArea: 'relationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <RelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({amigos.length})
            </h2>

            <ul>
              {amigos.map((pessoas) => {
                return (
                  <li key={pessoas}>
                    <a href={`/users/${pessoas}`}>
                      <img src={`https://github.com/${pessoas}.png`} />
                      <span>{pessoas}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </RelationsBoxWrapper>

          <RelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.title}`}>
                      <img src={community.imageUrl} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </RelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}