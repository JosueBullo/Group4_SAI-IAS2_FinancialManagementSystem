# api/views.py
from rest_framework import generics
from .models import Expense, Income, Budget
from .serializers import ExpenseSerializer, IncomeSerializer,BudgetSerializer

class ExpenseListView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class IncomeListView(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class IncomeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class BudgetListView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
