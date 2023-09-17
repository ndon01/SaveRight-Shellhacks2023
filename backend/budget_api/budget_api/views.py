from django.http import JsonResponse
from .models import Budget, Income, Expense
from .serializers import BudgetSerializer, IncomeSerializer, ExpenseSerializer
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response

from rest_framework import status
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


#get list of all budgets
@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def budget_list(request):
    #get all budjet from the database
    #serialize them 
    #retun a json response with the serialized data
    if request.method == 'GET':
        budgets = Budget.objects.all().values()
        serializer = BudgetSerializer(budgets, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)

#get list of all incomes
@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def income_list(request):
    if request.method == 'GET':
        incomes = Income.objects.all().values()
        serializer = IncomeSerializer(incomes, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        print("Recieved")
        serializer = IncomeSerializer(data=request.data)
        print(request.data.keys())
        if serializer.is_valid():
            print("Valid")
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)

#get list of all expenses
@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def expense_list(request):
    if request.method == 'GET':
        expenses = Expense.objects.all().values()
        serializer = ExpenseSerializer(expenses, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_expenses_and_budget(request):
    if request.method == 'GET':
        expenses = Expense.objects.all().values()
        incomes = Income.objects.all().values()
        e_Serializer = ExpenseSerializer(expenses, many=True)
        i_serializer = IncomeSerializer(incomes, many=True)
        return JsonResponse({'expenses': e_Serializer.data, 'incomes': i_serializer.data}, safe=False)
    return JsonResponse({'Expense Error':e_Serializer.errors, 'Income Error':i_serializer.errors})

#EXPENSE BY ID
@api_view(['GET','PUT','DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def expense_by_id(request, id):
    try:
        expense = Expense.objects.get(id=id)
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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def income_by_id(request, id):
    try:
        income = Income.objects.get(id=id)
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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def budget_by_id(request, id):
    try:
        budget = Budget.objects.get(id=id)
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
        user = authenticate(username=username, password=password)
        if user:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            print(f"User Logged in: {token}")
            return Response({'token': token}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
