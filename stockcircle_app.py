from nicegui import ui, app
from typing import Dict, List, Optional
import asyncio
from dataclasses import dataclass
from datetime import datetime

# 데이터 모델 정의
@dataclass
class Stock:
    symbol: str
    name: str
    shares: str
    value: str
    weight: str
    change: str
    is_positive: bool

@dataclass
class Investor:
    id: str
    name: str
    company: str
    performance: str
    is_positive: bool
    portfolio_value: str
    stocks: List[Stock]

# 샘플 데이터
investors_data = {
    'warren-buffett': Investor(
        id='warren-buffett',
        name='Warren Buffett',
        company='Berkshire Hathaway',
        performance='+0.63%',
        is_positive=True,
        portfolio_value='$252 Billion',
        stocks=[
            Stock('AAPL', 'Apple Inc.', '915,560,382', '$177,252,000,000', '50.76%', '+2.34%', True),
            Stock('BAC', 'Bank of America Corp', '1,032,852,006', '$34,196,000,000', '9.80%', '-1.23%', False),
            Stock('AXP', 'American Express Co', '151,610,700', '$28,279,000,000', '8.10%', '+0.87%', True),
            Stock('KO', 'Coca-Cola Co', '400,000,000', '$24,000,000,000', '6.87%', '+1.45%', True),
            Stock('CVX', 'Chevron Corp', '126,093,326', '$18,800,000,000', '5.38%', '-0.56%', False)
        ]
    ),
    'michael-burry': Investor(
        id='michael-burry',
        name='Michael Burry',
        company='Scion Asset Management',
        performance='+33.86%',
        is_positive=True,
        portfolio_value='$18.7 Million',
        stocks=[
            Stock('EL', 'Estee Lauder Cos Inc', '50,000', '$6,250,000', '33.42%', '+5.67%', True),
            Stock('CVE', 'Cenovus Energy Inc', '100,000', '$2,100,000', '11.23%', '+2.34%', True),
            Stock('BIIB', 'Biogen Inc', '25,000', '$1,875,000', '10.03%', '-1.23%', False)
        ]
    ),
    'cathie-wood': Investor(
        id='cathie-wood',
        name='Cathie Wood',
        company='ARK Invest',
        performance='+60.77%',
        is_positive=True,
        portfolio_value='$14 Billion',
        stocks=[
            Stock('COIN', 'Coinbase Global Inc', '7,200,000', '$1,440,000,000', '10.29%', '+15.67%', True),
            Stock('TSLA', 'Tesla Inc', '3,500,000', '$1,050,000,000', '7.50%', '+8.34%', True),
            Stock('RBLX', 'Roblox Corp', '10,000,000', '$700,000,000', '5.00%', '+12.45%', True)
        ]
    ),
    'bill-ackman': Investor(
        id='bill-ackman',
        name='Bill Ackman',
        company='Pershing Square',
        performance='-2.34%',
        is_positive=False,
        portfolio_value='$8.2 Billion',
        stocks=[]
    ),
    'charlie-munger': Investor(
        id='charlie-munger',
        name='Charlie Munger',
        company='Berkshire Hathaway',
        performance='+1.23%',
        is_positive=True,
        portfolio_value='$45 Billion',
        stocks=[]
    )
}

class StockCircleApp:
    def __init__(self):
        self.selected_investor = 'warren-buffett'
        self.setup_ui()

    def setup_ui(self):
        # 전체 레이아웃 설정
        ui.add_head_html('''
            <style>
                .investor-card {
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                .investor-card:hover {
                    background-color: #f9fafb;
                }
                .investor-card.selected {
                    background-color: #eff6ff;
                    border-color: #3b82f6;
                }
                .performance-positive {
                    color: #059669;
                }
                .performance-negative {
                    color: #dc2626;
                }
                .floating-button {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 1000;
                }
            </style>
        ''')

        # 헤더
        self.create_header()

        # 메인 컨테이너
        with ui.row().classes('w-full h-screen'):
            # 사이드바
            self.create_sidebar()

            # 메인 콘텐츠
            self.create_main_content()

        # 플로팅 버튼
        self.create_floating_button()

    def create_header(self):
        with ui.header().classes('bg-white border-b border-gray-200 px-6 py-4'):
            with ui.row().classes('max-w-7xl mx-auto items-center justify-between'):
                # 로고
                with ui.row().classes('items-center space-x-3'):
                    with ui.link('/').classes('flex items-center space-x-3'):
                        with ui.element('div').classes('w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'):
                            ui.label('S').classes('text-white font-bold text-sm')
                        ui.label('Stockcircle').classes('text-xl font-bold text-gray-900')

                # 검색바
                with ui.row().classes('flex-1 max-w-md mx-8'):
                    with ui.input(placeholder='Search stocks, investors...').classes('w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'):
                        ui.icon('search').classes('absolute right-3 top-2.5 h-5 w-5 text-gray-400')

                # 네비게이션
                with ui.row().classes('items-center space-x-4'):
                    pass
                    # ui.link('/fear-greed').classes('flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors').add(
                    #     ui.icon('trending_up').classes('h-5 w-5'),
                    #     ui.label('탐욕과 공포지수').classes('hidden sm:inline')
                    # )
                    # ui.link('/real-market-data').classes('flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors').add(
                    #     ui.icon('bar_chart').classes('h-5 w-5'),
                    #     ui.label('실시간 데이터').classes('hidden sm:inline')
                    # )
                    # ui.button(icon='menu').classes('text-gray-600 hover:text-gray-900')

    def create_sidebar(self):
        with ui.column().classes('w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto'):
            with ui.column().classes('p-6'):
                ui.label('Top Investors').classes('text-lg font-semibold text-gray-900 mb-4')

                # 필터 버튼들
                with ui.row().classes('mb-6'):
                    ui.button('All').classes('px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full')
                    ui.button('Growth').classes('px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200')
                    ui.button('Value').classes('px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200')
                    ui.button('Short').classes('px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200')

                # 투자자 목록
                self.investor_cards = {}
                for investor_id, investor in investors_data.items():
                    self.create_investor_card(investor_id, investor)

    def create_investor_card(self, investor_id: str, investor: Investor):
        with ui.card().classes(f'investor-card p-4 rounded-lg transition-colors {"selected" if investor_id == self.selected_investor else ""}') as card:
            card.on('click', lambda: self.select_investor(investor_id))

            with ui.row().classes('items-center justify-between mb-2'):
                ui.label(investor.name).classes('font-medium text-gray-900')
                with ui.row().classes('items-center space-x-1'):
                    icon_name = 'trending_up' if investor.is_positive else 'trending_down'
                    icon_color = 'text-green-500' if investor.is_positive else 'text-red-500'
                    ui.icon(icon_name).classes(f'h-4 w-4 {icon_color}')

                    performance_class = 'performance-positive' if investor.is_positive else 'performance-negative'
                    ui.label(investor.performance).classes(f'text-sm font-medium {performance_class}')

            with ui.row().classes('items-center space-x-1 text-sm text-gray-500'):
                ui.icon('attach_money').classes('h-4 w-4')
                ui.label(investor.portfolio_value)

            self.investor_cards[investor_id] = card

    def create_main_content(self):
        with ui.column().classes('flex-1 p-8'):
            self.main_content_container = ui.column()
            self.update_main_content()

    def update_main_content(self):
        self.main_content_container.clear()

        investor = investors_data.get(self.selected_investor)
        if not investor:
            with self.main_content_container:
                with ui.column().classes('text-center text-gray-500'):
                    ui.icon('business').classes('h-12 w-12 mx-auto mb-4 text-gray-300')
                    ui.label('Select an investor to view their portfolio')
            return

        with self.main_content_container:
            # 헤더
            with ui.column().classes('mb-8'):
                with ui.row().classes('items-center justify-between mb-4'):
                    with ui.column():
                        ui.label(investor.name).classes('text-2xl font-bold text-gray-900')
                        ui.label(investor.company).classes('text-gray-600')

                    with ui.row().classes('items-center space-x-4'):
                        with ui.column().classes('text-right'):
                            ui.label('Portfolio Value').classes('text-sm text-gray-500')
                            ui.label(investor.portfolio_value).classes('text-lg font-semibold text-gray-900')

                        with ui.row().classes('items-center space-x-1'):
                            icon_name = 'trending_up' if investor.is_positive else 'trending_down'
                            icon_color = 'text-green-500' if investor.is_positive else 'text-red-500'
                            ui.icon(icon_name).classes(f'h-5 w-5 {icon_color}')

                            performance_class = 'performance-positive' if investor.is_positive else 'performance-negative'
                            ui.label(investor.performance).classes(f'text-lg font-semibold {performance_class}')

            # 포트폴리오 테이블
            if investor.stocks:
                with ui.card().classes('bg-white rounded-lg shadow-sm border border-gray-200'):
                    with ui.column().classes('px-6 py-4 border-b border-gray-200'):
                        ui.label('Portfolio Holdings').classes('text-lg font-semibold text-gray-900')

                    # 테이블 헤더
                    with ui.row().classes('bg-gray-50 px-6 py-3'):
                        ui.label('Stock').classes('flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider')
                        ui.label('Shares').classes('flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider')
                        ui.label('Value').classes('flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider')
                        ui.label('Weight').classes('flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider')
                        ui.label('Change').classes('flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider')

                    # 테이블 행들
                    for stock in investor.stocks:
                        with ui.row().classes('bg-white border-b border-gray-200 px-6 py-4 hover:bg-gray-50'):
                            with ui.column().classes('flex-1'):
                                ui.label(stock.symbol).classes('text-sm font-medium text-gray-900')
                                ui.label(stock.name).classes('text-sm text-gray-500')

                            ui.label(stock.shares).classes('flex-1 text-sm text-gray-900')
                            ui.label(stock.value).classes('flex-1 text-sm text-gray-900')
                            ui.label(stock.weight).classes('flex-1 text-sm text-gray-900')

                            with ui.row().classes('flex-1 items-center space-x-1'):
                                icon_name = 'trending_up' if stock.is_positive else 'trending_down'
                                icon_color = 'text-green-500' if stock.is_positive else 'text-red-500'
                                ui.icon(icon_name).classes(f'h-4 w-4 {icon_color}')

                                change_class = 'performance-positive' if stock.is_positive else 'performance-negative'
                                ui.label(stock.change).classes(f'text-sm font-medium {change_class}')
            else:
                with ui.card().classes('bg-white rounded-lg shadow-sm border border-gray-200 p-8'):
                    ui.label('No portfolio data available').classes('text-center text-gray-500')

    def create_floating_button(self):
        with ui.button(icon='camera_alt').classes('floating-button w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors'):
            ui.tooltip('이미지 업로드')

    def select_investor(self, investor_id: str):
        self.selected_investor = investor_id

        # 선택된 카드 스타일 업데이트
        for card_id, card in self.investor_cards.items():
            if card_id == investor_id:
                card.classes(replace='investor-card selected p-4 rounded-lg transition-colors')
            else:
                card.classes(replace='investor-card p-4 rounded-lg transition-colors')

        # 메인 콘텐츠 업데이트
        self.update_main_content()

# 앱 실행
if __name__ == '__main__':
    app = StockCircleApp()
    ui.run(
        title='Stockcircle',
        port=8080,
        reload=False,

        show=True
    )