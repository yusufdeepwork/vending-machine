import waterImage from '@/assets/water.png'
import sodaImage from '@/assets/soda.png'
import colaImage from '@/assets/cola.png'

export const Texts = {
  APP_TITLE: 'Otomat Makinesi',
  ADD_MONEY_PROMPT: 'Eklenen Para: ',
  SELECT_PRODUCT_PROMPT: 'Lütfen ürün seçin',
  SELECTED_PRODUCT_PROMPT: (name: string) => `${name} seçildi `,
  NEED_MONEY: 'Lütfen para ekleyin',
  INSUFFICIENT_FUNDS: 'Yetersiz bakiye, daha fazla para ekleyin',
  NO_PRODUCT_SELECTED: 'Önce bir ürün seçin',
  PRODUCT_DELIVERED: (name: string, remaining: number) =>
    `${name} verildi. Kalan: ${remaining} 🪙`,
  REFUND_MESSAGE: (amount: number) => `İade edilen tutar: ${amount} 🪙`,
  OPERATION_COMPLETED_REFUND_MESSAGE: (amount: number) =>
    `İade edilecek tutar: ${amount} 🪙`,
  BUY_BUTTON: 'Satın Al',
  REFUND_BUTTON: 'Vazgeç',
  SELECT_NEW_PRODUCT: 'Yeniden başlamak için ürün seçin lütfen.',
  OPERATION_COMPLETED: 'İşlem tamamlandı.',
  MAXIMUM_ENERGY_CONSUMPTION_ALERT:
    'Maksimumum enerji kullanımı aşıldı.\n İşlem yapabilmek için lütfen enerji tüketimini azaltın.',
  MINUTE: 'Dakika',
  SECOND: 'Saniye',
  COLDNESS: 'Soğukluk',
  ENERGY_LEVEL: 'Enerji Seviyesi',
  ENTER_VALID_MONEY: 'Lütfen geçerli para girin',
  RESET_BUTTON: 'Sıfırla',
  COLLECT_MONEY_BUTTON: 'Parayı Topla',
  INCORRECT_PASSWORD: 'Yanlış şifre. Yetkisiz erişim engellendi.',
  COLLECTED_MONEY: 'Toplanan tutar:',
  ENTER_ADMIN_PASSWORD: 'Lütfen para toplamak için şifreyi giriniz:',
  REMAINING_TIME: 'İşlem için kalan süre',
}

export const Products = [
  {
    name: 'Su',
    price: 25,
    imgSrc: waterImage,
  },
  {
    name: 'Kola',
    price: 35,
    imgSrc: colaImage,
  },
  {
    name: 'Soda',
    price: 45,
    imgSrc: sodaImage,
  },
]

export const MoneyValues = [1, 5, 10, 20]

export const TemperatureLevels = [1, 2, 3]

export const EnergyLevels = [1, 2, 3, 4, 5]
