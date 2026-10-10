import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

// AAA - Arrange, Act, Assert - Preparar, Agir, Verificar

test.describe('Consulta de Pedido', ()=> {
  
  test.beforeEach(async ({page}) => {
     //Arrange
     await page.goto('http://localhost:5173/')
     await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
   
     await page.getByRole('link', { name: 'Consultar Pedido' }).click()
     await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = 'VLO-TLNB7T'
        
    //Act
    
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
    //Assert

    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: VLO-TLNB7T
      - img
      - text: APROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Midnight Black
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: sport Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: Vanessa Andrade
      - paragraph: Email
      - paragraph: vanessaandradet@xn--vel-mna.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
    
    })
    
  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = 'VLO-1PWLI8'
          
    //Act
      
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
      
    //Assert
  
    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: VLO-1PWLI8
      - img
      - text: REPROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Midnight Black
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: aero Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: Sandy Junior
      - paragraph: Email
      - paragraph: sandy@junior.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
      
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({page})=> {
    
      const order = generateOrderCode()
    
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
        `)
    
    })
})

