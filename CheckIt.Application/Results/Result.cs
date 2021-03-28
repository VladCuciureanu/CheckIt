﻿using System.Threading.Tasks;

namespace CheckIt.Application.Results
{
    public class Result : IResult
    {
        public bool Failed => !Succeeded;

        public string Message { get; set; }

        public bool Succeeded { get; set; }

        public static IResult Fail()
        {
            return new Result {Succeeded = false};
        }

        public static IResult Fail(string message)
        {
            return new Result {Succeeded = false, Message = message};
        }

        public static Task<IResult> FailAsync()
        {
            return Task.FromResult(Fail());
        }

        public static Task<IResult> FailAsync(string message)
        {
            return Task.FromResult(Fail(message));
        }

        public static IResult Success()
        {
            return new Result {Succeeded = true};
        }

        public static IResult Success(string message)
        {
            return new Result {Succeeded = true, Message = message};
        }

        public static Task<IResult> SuccessAsync()
        {
            return Task.FromResult(Success());
        }

        public static Task<IResult> SuccessAsync(string message)
        {
            return Task.FromResult(Success(message));
        }
    }

    public class Result<T> : Result, IResult<T>
    {
        public T Data { get; set; }

        public new static Result<T> Fail()
        {
            return new Result<T> {Succeeded = false};
        }

        public new static Result<T> Fail(string message)
        {
            return new Result<T> {Succeeded = false, Message = message};
        }

        public new static Task<Result<T>> FailAsync()
        {
            return Task.FromResult(Fail());
        }

        public new static Task<Result<T>> FailAsync(string message)
        {
            return Task.FromResult(Fail(message));
        }

        public new static Result<T> Success()
        {
            return new Result<T> {Succeeded = true};
        }

        public new static Result<T> Success(string message)
        {
            return new Result<T> {Succeeded = true, Message = message};
        }

        public static Result<T> Success(T data)
        {
            return new Result<T> {Succeeded = true, Data = data};
        }

        public static Result<T> Success(T data, string message)
        {
            return new Result<T> {Succeeded = true, Data = data, Message = message};
        }

        public new static Task<Result<T>> SuccessAsync()
        {
            return Task.FromResult(Success());
        }

        public new static Task<Result<T>> SuccessAsync(string message)
        {
            return Task.FromResult(Success(message));
        }

        public static Task<Result<T>> SuccessAsync(T data)
        {
            return Task.FromResult(Success(data));
        }

        public static Task<Result<T>> SuccessAsync(T data, string message)
        {
            return Task.FromResult(Success(data, message));
        }
    }
}