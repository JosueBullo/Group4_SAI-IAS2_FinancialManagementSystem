# api/serializers.py
from rest_framework import serializers
from .models import Expense
from .models import Income 
from .models import Budget

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'  # Or specify fields like: ['id', 'amount', 'category', 'description', 'date']

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'category', 'amount', 'month']
