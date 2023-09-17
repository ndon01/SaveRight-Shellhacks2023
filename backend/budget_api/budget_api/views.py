from django.http import JsonResponse
from .models import Budget, Income, Expense
from .serializers import BudgetSerializer, IncomeSerializer, ExpenseSerializer
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response

from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
import jwt
import time
from functools import wraps

def check_token():
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            token = request.headers['Authorization']
            payload = None
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.exceptions.DecodeError:
                return Response({'error': 'Token invalid'}, status=status.HTTP_401_UNAUTHORIZED)
            
            thisUser = User.objects.get(username=payload['username'])
            if thisUser is None:
                return Response(status=status.HTTP_404_NOT_FOUND)   
            
            request.user = thisUser         
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator
    
#get list of all budgets
@api_view(['GET','POST'])
@check_token()
def budget_list(request):
    #get all budjet from the database
    #serialize them 
    #retun a json response with the serialized data
    if request.method == 'GET':
        budgets = Budget.objects.all().values()
        serializer = BudgetSerializer(budgets, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        request.data['username'] = request.user.get_username()
        serializer = BudgetSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)
    

#get list of all incomes
@api_view(['GET','POST'])
@check_token()
def income_list(request):
    if request.method == 'GET':
        incomes = Income.objects.all().values()
        serializer = IncomeSerializer(incomes, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        request.data['username'] = request.user.get_username()
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            print("Valid")
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)

#get list of all expenses
@api_view(['GET','POST'])
@check_token()
def expense_list(request):
    if request.method == 'GET':
        expenses = Expense.objects.all().values()
        serializer = ExpenseSerializer(expenses, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        request.data['username'] = request.user.get_username()
        if request.data['budget'] == 'None':
            request.data['budget'] = None
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            print(f"{request.data}: Valid")
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)
    
    
#get list of all income and expenses

@api_view(['GET'])
@check_token()
def get_expenses_and_budget(request):
    try:
        expenses = Expense.objects.filter(username=request.user.get_username())
        incomes = Income.objects.filter(username=request.user.get_username())
        print(expenses)
        print(incomes)
    except Expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        e_Serializer = ExpenseSerializer(expenses, many=True)
        i_serializer = IncomeSerializer(incomes, many=True)
        return JsonResponse({'expenses': e_Serializer.data, 'incomes': i_serializer.data}, safe=False)
    return JsonResponse({'Expense Error':e_Serializer.errors, 'Income Error':i_serializer.errors})

#EXPENSE BY ID
@api_view(['GET','PUT','DELETE'])
@check_token()
def expense_by_id(request, id):
    try:
        expenses = Expense.objects.get(username=request.user.get_username())
        expense = expenses.get(id=id)
    except Expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ExpenseSerializer(expense)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#INCOME BY ID
@api_view(['GET','PUT','DELETE'])
@check_token()
def income_by_id(request, id):
    try:
        thisUser = request.user
        incomes = Income.objects.get(username=thisUser.get_username())
        income = incomes.get(id=id)
    except Income.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = IncomeSerializer(income)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = IncomeSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
#BUDGET BY ID
@api_view(['GET','PUT','DELETE'])
@check_token()
def budget_by_id(request, id):
    try:
        thisUser = request.user
        budgets_of_user = Budget.objects.filter(username=thisUser.get_username())
        budget = budgets_of_user.get(id=id)
    except Budget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BudgetSerializer(budget)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = BudgetSerializer(budget, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        
        budget.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    
@api_view(['GET'])
@check_token()
def budget_by_user(request):
    print(request.data)
    if request.method == 'GET':
        thisUser = request.user
        budgets = Budget.objects.filter(username=thisUser.get_username())
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)
    
#USER AUTHENTICATION
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        username = user.get_username()
        encoded = jwt.encode({"username": username}, "secret", algorithm="HS256")
        print(encoded)
        return Response({'token': encoded,'username':username}, status=status.HTTP_200_OK)

