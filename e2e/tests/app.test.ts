import { expect, test } from '@playwright/test'

test('Navigation', async ({ page }) => {
  await page.goto('http://localhost:8000/')

  await expect(page).toHaveTitle('LOTTO Berlin')

  await expect(page.getByRole('heading', { name: /Gewinnzahlen & Quoten/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Jetzt Spielen/ })).toBeVisible()
  await page.getByRole('link', { name: /Jetzt Spielen/ }).click()

  await page.waitForURL('**/normalschein')
  expect(page.url()).toBe('http://localhost:8000/lotto6aus49/normalschein')
  await expect(page.getByRole('heading', { name: /Normalschein/ })).toBeVisible()

  await page.goto('/lotto6aus49/quoten')
  await expect(page.getByRole('heading', { name: /Quoten/ })).toBeVisible()

  await page.goto(`/${new Date()}`)
  await expect(page.getByRole('heading', { name: /404 - Seite nicht gefunden/ })).toBeVisible()
})
