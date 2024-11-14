# api/urls.py
from django.urls import path
from .views import ExpenseListView, ExpenseDetailView, IncomeListView, IncomeDetailView, BudgetListView, BudgetDetailView
from .views import register_user, login_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('expenses/', ExpenseListView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),
    path('income/', IncomeListView.as_view(), name='income-list'),
    path('income/<int:pk>/', IncomeDetailView.as_view(), name='income-detail'),
    path('budget/', BudgetListView.as_view(), name='budget-list'),  # New budget endpoints
    path('budget/<int:pk>/', BudgetDetailView.as_view(), name='budget-detail'),  # Detail endpoint for budget
]
