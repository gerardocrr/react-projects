import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
      userName: 'gerardocrr',
      name: 'Gerardo Cruz',
      isFollowing: true
    },
    {
      userName: 'microsoft',
      name: 'Microsoft',
      isFollowing: true
    },    
    {
      userName: 'facebook',
      name: 'Facebook',
      isFollowing: false
    },
    {
      userName: 'supabase',
      name: 'Supabase',
      isFollowing: true
    }
  ]

export function App () {
    return(
      <main className='Card'>
        <section className='App'>
          {
              users.map(({ userName, name, isFollowing }) => (
                  <TwitterFollowCard userName={userName} initialIsFollowing={isFollowing} key={userName}>
                      {name}
                  </TwitterFollowCard>
                  )
              )
          }
      </section>
      </main>
    )
}