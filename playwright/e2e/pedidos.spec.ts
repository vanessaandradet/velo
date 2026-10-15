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
      - status:
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
    
      const statusBadge = page.getByRole('status').filter({hasText: 'APROVADO'})

      await expect(statusBadge).toHaveClass(/bg-green-100/)
      await expect(statusBadge).toHaveClass(/text-green-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

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
      - status:
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
      
      const statusBadge = page.getByRole('status').filter({hasText: 'REPROVADO'})

      await expect(statusBadge).toHaveClass(/bg-red-100/)
      await expect(statusBadge).toHaveClass(/text-red-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-x/)

    })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = 'VLO-BMYGD9'
           
    //Act
        
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
        
    //Assert
    
    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: VLO-BMYGD9
      - status:
          - img
          - text: EM_ANALISE
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
      - paragraph: João Teste Silva
      - paragraph: Email
      - paragraph: joaoteste@veli.com.br
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
        
      const statusBadge = page.getByRole('status').filter({hasText: 'EM_ANALISE'})

      await expect(statusBadge).toHaveClass(/bg-amber-100/)
      await expect(statusBadge).toHaveClass(/text-amber-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-clock-icon/)

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

